import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth.api';
import { useAuth } from '../auth/authContext';
import { setAccessToken } from '../utils/accessToken';
import { getApiErrorMessage } from '../utils/errors';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      setAccessToken(res.accessToken);
      setUser(res.user);
      navigate('/dashboard');
    },
  });

  const errorMessage = getApiErrorMessage(loginMutation.error, 'Login failed');
  const isSubmitting = loginMutation.isPending;
  const hasError = loginMutation.isError;

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-lime-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md rounded-3xl border border-emerald-100/80 bg-white/86 p-6 shadow-2xl shadow-emerald-200/40 backdrop-blur sm:max-w-lg sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Sign in to continue to your workspace.
          </p>
        </div>

        <form
          className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          noValidate
        >
          <fieldset className="space-y-4 sm:space-y-5" disabled={isSubmitting}>
            <div className="space-y-1">
              <label
                className="text-sm block font-semibold text-slate-800"
                htmlFor="login-email"
              >
                Email
              </label>
                <input
                  id="login-email"
                  className="w-full rounded-xl border border-emerald-200/90 bg-white/95 px-4 py-2.5 text-base text-slate-800 transition placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100 sm:py-3"
                type="email"
                name="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
                aria-invalid={hasError}
                aria-describedby={hasError ? 'login-error' : undefined}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label
                className="text-sm block font-semibold text-slate-800"
                htmlFor="login-password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  className="w-full rounded-xl border border-emerald-200/90 bg-white/95 px-4 py-2.5 pr-12 text-base text-slate-800 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100 sm:py-3"
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  minLength={6}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? 'login-error' : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 transition hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  type="button"
                  aria-label={
                    isPasswordVisible ? 'Hide password' : 'Show password'
                  }
                  aria-pressed={isPasswordVisible}
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {isPasswordVisible ? 'Hide password' : 'Show password'}
                  </span>
                </button>
              </div>
            </div>

            {hasError && (
              <p
                className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700"
                role="alert"
                id="login-error"
              >
                {errorMessage}
              </p>
            )}

            <button
              className="w-full cursor-pointer rounded-xl border border-emerald-600 bg-linear-to-r from-emerald-600 via-green-600 to-lime-500 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:from-emerald-500 hover:via-green-500 hover:to-lime-400 hover:shadow-lg hover:shadow-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:from-slate-400 disabled:via-slate-400 disabled:to-slate-400 disabled:shadow-none sm:py-3 sm:text-base"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-xs text-slate-500 sm:text-sm">
              You cannot self-register. Ask admin for an invite link.
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
