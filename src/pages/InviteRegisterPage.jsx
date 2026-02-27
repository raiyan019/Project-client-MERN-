import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { registerViaInviteApi } from '../api/auth.api';
import { useAuth } from '../auth/authContext';
import Button from '../components/ui/Button';
import TextInput from '../components/ui/TextInput';
import { setAccessToken } from '../utils/accessToken';
import { getApiErrorMessage } from '../utils/errors';

export default function InviteRegisterPage() {
  const [searchParams] = useSearchParams();
  const token = useMemo(
    () => searchParams.get('token') || '',
    [searchParams],
  );

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerViaInviteApi,
    onSuccess: (res) => {
      setAccessToken(res.accessToken);
      setUser(res.user);
      navigate('/dashboard');
    },
  });

  const errorMessage = registerMutation.isError
    ? getApiErrorMessage(registerMutation.error, 'Registration failed')
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10 sm:py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-6 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-lime-300/25 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border border-emerald-100/80 bg-white/84 p-6 shadow-xl shadow-emerald-200/35 backdrop-blur sm:p-8">
        <h1 className="text-2xl font-bold text-emerald-950">Complete Registration</h1>
        <p className="mt-2 text-sm text-slate-600">
          Finish setup to access your workspace.
        </p>

        {!token && (
          <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
            Missing invite token. Please use the invite link provided by admin.
          </p>
        )}

        <div className="mt-5 space-y-3">
          <TextInput
            className="w-full"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInput
            className="w-full"
            placeholder="Set password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
              {errorMessage}
            </p>
          )}

          <Button
            className="w-full"
            disabled={!token || registerMutation.isPending}
            isLoading={registerMutation.isPending}
            loadingLabel="Creating account..."
            onClick={() =>
              registerMutation.mutate({ token, name, password })
            }
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
