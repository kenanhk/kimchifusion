import { createClient } from '@supabase/supabase-js';

// Validate environment variables at runtime
const validateEnvVariables = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch {
    throw new Error('Invalid Supabase URL format');
  }

  return { supabaseUrl, supabaseAnonKey };
};

const { supabaseUrl, supabaseAnonKey } = validateEnvVariables();

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'app-session-key', // Custom storage key
    storage: window.localStorage, // Explicitly use localStorage
  },
  global: {
    headers: {
      'x-application-name': 'kimchi-fusion',
    },
  },
});

// Add session refresh logic
let refreshTokenTimer: number | null = null;

const setupSessionRefresh = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.expires_at) {
    const expiresAt = new Date(session.expires_at).getTime();
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;

    // Refresh 5 minutes before expiry
    const refreshTime = Math.max(0, timeUntilExpiry - 5 * 60 * 1000);

    if (refreshTokenTimer) {
      window.clearTimeout(refreshTokenTimer);
    }

    refreshTokenTimer = window.setTimeout(async () => {
      const { error } = await supabase.auth.refreshSession();
      if (!error) {
        setupSessionRefresh(); // Setup next refresh
      }
    }, refreshTime);
  }
};

// Setup initial session refresh
setupSessionRefresh();

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    setupSessionRefresh();
  } else if (refreshTokenTimer) {
    window.clearTimeout(refreshTokenTimer);
  }
});

export default supabase; 