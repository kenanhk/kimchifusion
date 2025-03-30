-- Create a table to track submission attempts
CREATE TABLE submission_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    attempt_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    success BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create an index for faster lookups
CREATE INDEX idx_submission_attempts_email_time ON submission_attempts(email, attempt_time);
CREATE INDEX idx_submission_attempts_ip_time ON submission_attempts(ip_address, attempt_time);

-- Create a function to check rate limits
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_email TEXT,
    p_ip_address TEXT,
    p_time_window_minutes INTEGER DEFAULT 60,
    p_max_attempts INTEGER DEFAULT 3
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_attempt_count INTEGER;
BEGIN
    -- Count recent attempts for both email and IP
    SELECT COUNT(*)
    INTO v_attempt_count
    FROM submission_attempts
    WHERE (email = p_email OR ip_address = p_ip_address)
    AND attempt_time > NOW() - (p_time_window_minutes || ' minutes')::INTERVAL;

    -- Return true if under limit, false if over limit
    RETURN v_attempt_count < p_max_attempts;
END;
$$;

-- Create a function to record submission attempt
CREATE OR REPLACE FUNCTION record_submission_attempt(
    p_email TEXT,
    p_ip_address TEXT,
    p_success BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO submission_attempts (email, ip_address, success)
    VALUES (p_email, p_ip_address, p_success);
END;
$$;

-- Add RLS policies to the feedbacks table
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Create a policy that checks rate limits before allowing insert
CREATE POLICY check_rate_limit_policy ON feedbacks
    FOR INSERT
    WITH CHECK (
        check_rate_limit(
            NEW.email,
            current_setting('request.jwt.claims', true)::json->>'ip_address',
            60,  -- 60 minutes window
            3    -- 3 attempts max
        )
    );

-- Create a policy that records the attempt after successful insert
CREATE POLICY record_attempt_policy ON feedbacks
    FOR INSERT
    WITH CHECK (
        record_submission_attempt(
            NEW.email,
            current_setting('request.jwt.claims', true)::json->>'ip_address',
            true
        ) IS NOT NULL
    ); 