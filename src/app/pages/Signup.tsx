import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { ArrowLeft } from 'lucide-react';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) return setError('Please fill in all fields');
    if (password !== confirmPassword) return setError('Passwords do not match');
    if (password.length < 8) return setError('Password must be at least 8 characters');
    try {
      await signup(email, password, name);
      navigate('/onboarding');
    } catch {
      setError('Failed to create account');
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
          <p className="mb-2 text-[14px] font-medium text-ceriga-accent">Create account</p>
          <h1 className="font-display text-[28px] font-semibold tracking-tight text-ceriga-text">Sign up</h1>
          <p className="mb-8 mt-2 text-[15px] text-ceriga-muted">Start building professional tech packs.</p>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[14px] text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field id="name" label="Full name" value={name} onChange={setName} placeholder="John Doe" />
            <Field id="email" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
            <Field id="password" label="Password" value={password} onChange={setPassword} placeholder="At least 8 characters" type="password" />
            <Field id="confirmPassword" label="Confirm password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter your password" type="password" />
            <Button type="submit" className="h-11 w-full">
              Create account
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

          <GoogleAuthButton flow="signup" />

          <p className="mt-6 text-center text-[15px] text-ceriga-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-ceriga-accent hover:text-ceriga-accent-hover">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-ceriga-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-ceriga-border bg-ceriga-elevated px-4 text-[15px] text-ceriga-text placeholder:text-ceriga-subtle focus:border-ceriga-accent focus:outline-none focus:ring-2 focus:ring-ceriga-accent/20"
        placeholder={placeholder}
      />
    </div>
  );
}
