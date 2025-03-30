interface ErrorResponse {
  userMessage: string;
  shouldLog: boolean;
}

// Safe error messages that don't expose internal details
const ERROR_MESSAGES = {
  SUBMISSION_FAILED: 'There was an error submitting your feedback. Please try again.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  NETWORK_ERROR: 'Connection error. Please check your internet connection and try again.',
  RATE_LIMIT: 'Too many attempts. Please try again later.',
  AUTH_ERROR: 'Authentication error. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  DEFAULT: 'An unexpected error occurred. Please try again.'
};

// Safely handle errors without exposing internal details
export const handleError = (error: unknown): ErrorResponse => {
  // Default response
  const defaultResponse: ErrorResponse = {
    userMessage: ERROR_MESSAGES.DEFAULT,
    shouldLog: true
  };

  if (!error) {
    return defaultResponse;
  }

  // Handle known error types
  if (error instanceof Error) {
    // Database connection errors
    if (error.message.includes('connection') || error.message.includes('network')) {
      return {
        userMessage: ERROR_MESSAGES.NETWORK_ERROR,
        shouldLog: true
      };
    }

    // Validation errors
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return {
        userMessage: ERROR_MESSAGES.VALIDATION_FAILED,
        shouldLog: false // Don't log validation errors
      };
    }

    // Rate limiting errors
    if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
      return {
        userMessage: ERROR_MESSAGES.RATE_LIMIT,
        shouldLog: false // Don't log rate limit errors
      };
    }

    // Authentication errors
    if (error.message.includes('auth') || error.message.includes('unauthorized')) {
      return {
        userMessage: ERROR_MESSAGES.AUTH_ERROR,
        shouldLog: true
      };
    }
  }

  // For Supabase errors
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code: string }).code;
    
    // Handle specific Supabase error codes without exposing them
    switch (code) {
      case '23505': // Unique violation
        return {
          userMessage: 'This feedback has already been submitted.',
          shouldLog: false
        };
      case '23503': // Foreign key violation
      case '23502': // Not null violation
        return {
          userMessage: ERROR_MESSAGES.VALIDATION_FAILED,
          shouldLog: true
        };
      case '42501': // Permission denied
        return {
          userMessage: ERROR_MESSAGES.AUTH_ERROR,
          shouldLog: true
        };
      case '42P01': // Undefined table
      case '42P02': // Undefined column
        return {
          userMessage: ERROR_MESSAGES.SERVER_ERROR,
          shouldLog: true
        };
      default:
        return defaultResponse;
    }
  }

  return defaultResponse;
};

// Safely log errors without sensitive data
export const safeLogError = (error: unknown, context: string = 'Error'): void => {
  // In production, this could be connected to your error tracking service
  if (process.env.NODE_ENV !== 'production') {
    // Create a safe error object without sensitive data
    const safeError = {
      timestamp: new Date().toISOString(),
      type: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : 'Unknown error',
      context,
      // Add any non-sensitive metadata that might be helpful for debugging
      environment: process.env.NODE_ENV,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      // Don't include any user data or form contents
    };

    console.error(`${context}:`, safeError);
  }
}; 