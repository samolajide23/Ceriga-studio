import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { ArrowLeft } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Please fill in all fields');
    try {
      await login(email, password);
      let onboardingDone = false;
      try {
        onboardingDone = localStorage.getItem('ceriga_onboarding_done') === '1';
      } catch {
        /* ignore */
      }
      navigate(onboardingDone ? '/dashboard' : '/onboarding');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-x-hidden bg-ceriga-bg px-5 py-10">
      <div className="w-full max-w-[400px]">
        <Link
          to="/"
          className="mb-6 inline-flex items-center text-[14px] text-ceriga-muted transition-colors hover:text-ceriga-text"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="rounded-2xl border border-ceriga-border bg-ceriga-surface p-8">
          <p className="mb-2 text-[14px] font-medium text-ceriga-accent">Welcome back</p>
          <h1 className="font-display text-[28px] font-semibold tracking-tight text-ceriga-text">Log in</h1>
          <p className="mb-8 mt-2 text-[15px] text-ceriga-muted">Access your Ceriga Studio workspace.</p>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[14px] text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-ceriga-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-ceriga-border bg-ceriga-elevated px-4 text-[15px] text-ceriga-text placeholder:text-ceriga-subtle focus:border-ceriga-accent focus:outline-none focus:ring-2 focus:ring-ceriga-accent/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-ceriga-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-ceriga-border bg-ceriga-elevated px-4 text-[15px] text-ceriga-text placeholder:text-ceriga-subtle focus:border-ceriga-accent focus:outline-none focus:ring-2 focus:ring-ceriga-accent/20"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="h-11 w-full">
              Log in
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <span className="w-full border-t border-ceriga-separator" />
            </div>
            <div className="relative flex justify-center text-[13px]">
              <span className="bg-ceriga-surface px-3 text-ceriga-subtle">or</span>
            </div>
          </div>

          <GoogleAuthButton flow="login" />

          <p className="mt-6 text-center text-[15px] text-ceriga-muted">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-ceriga-accent hover:text-ceriga-accent-hover">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
