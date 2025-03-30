// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Remove HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, '');
  
  // Remove special characters but keep basic punctuation
  const sanitized = withoutTags
    .replace(/[^\w\s.,!?@-]/g, '')
    .trim();
  
  return sanitized;
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Phone number validation (basic format)
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s+()-]{8,}$/;
  return phoneRegex.test(phone);
};

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  storageKey: 'feedback_submissions'
};

interface RateLimitData {
  attempts: number;
  timestamp: number;
}

// Temporarily disable rate limiting for testing
export const checkRateLimit = (): boolean => {
  return true; // Always return true to bypass rate limiting
};

export const getRateLimitResetTime = (): number => {
  return 0; // Return 0 to indicate no waiting time
}; 