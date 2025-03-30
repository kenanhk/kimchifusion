-- Create the feedbacks table
CREATE TABLE feedbacks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 0 AND overall_rating <= 5),
    enjoyed_most TEXT,
    food_quality INTEGER CHECK (food_quality >= 0 AND food_quality <= 5),
    service_quality INTEGER CHECK (service_quality >= 0 AND service_quality <= 5),
    improvements TEXT,
    additional_comments TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_feedbacks_email ON feedbacks(email);
CREATE INDEX idx_feedbacks_submitted_at ON feedbacks(submitted_at);

-- Enable Row Level Security
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow inserts from all users" ON feedbacks
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create a policy to allow reads from all users
CREATE POLICY "Allow reads from all users" ON feedbacks
    FOR SELECT
    TO public
    USING (true); 