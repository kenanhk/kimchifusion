import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import supabase from '../supabaseClient';

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rate limiting state
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  // Load rate limiting data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('loginRateLimit');
    if (storedData) {
      const { attempts, lockout } = JSON.parse(storedData);
      setLoginAttempts(attempts);
      setLockoutUntil(lockout);
    }
  }, []);

  // Update localStorage when rate limiting data changes
  useEffect(() => {
    if (loginAttempts > 0 || lockoutUntil) {
      localStorage.setItem('loginRateLimit', JSON.stringify({
        attempts: loginAttempts,
        lockout: lockoutUntil,
      }));
    }
  }, [loginAttempts, lockoutUntil]);

  // Check and reset rate limiting
  useEffect(() => {
    if (lockoutUntil && Date.now() > lockoutUntil) {
      setLoginAttempts(0);
      setLockoutUntil(null);
      localStorage.removeItem('loginRateLimit');
    }
  }, [lockoutUntil]);

  // Get the redirect path from location state or default to /admin
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limiting
    if (lockoutUntil) {
      if (Date.now() < lockoutUntil) {
        const minutesLeft = Math.ceil((lockoutUntil - Date.now()) / (60 * 1000));
        setError(`Too many login attempts. Please try again in ${minutesLeft} minutes.`);
        return;
      } else {
        setLoginAttempts(0);
        setLockoutUntil(null);
      }
    }

    if (loginAttempts >= RATE_LIMIT.maxAttempts) {
      const lockoutTime = Date.now() + RATE_LIMIT.windowMs;
      setLockoutUntil(lockoutTime);
      setError(`Too many login attempts. Please try again in 15 minutes.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setLoginAttempts(prev => prev + 1);
        throw error;
      }

      // Reset rate limiting on successful login
      setLoginAttempts(0);
      setLockoutUntil(null);
      localStorage.removeItem('loginRateLimit');

      // Navigate to the attempted page or admin
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('adminLogin', 'Admin Login')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                {t('email', 'Email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('email', 'Email')}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('password', 'Password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('password', 'Password')}
                autoComplete="current-password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || (!!lockoutUntil && Date.now() < lockoutUntil)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('signingIn', 'Signing in...') : t('signIn', 'Sign in')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 