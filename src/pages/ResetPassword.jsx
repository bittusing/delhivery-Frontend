import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPasswordWithToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Invalid reset link. Request a new password reset from the login page.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const message = await resetPasswordWithToken(token, password);
      setSuccess(message);
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      setError(err.message || 'Reset failed. Please request a new link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 max-w-xl w-full">
        <h2 className="text-2xl font-bold text-[#1a2b4b] mb-2">Set new password</h2>
        <p className="text-sm text-slate-600 mb-6">Choose a strong password for your account.</p>
        <div className="h-1 w-full bg-slate-100 mb-8 rounded-full" />

        {!token && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-sm">
            This link is missing a token.{' '}
            <Link to="/forgot-password" className="font-bold underline">
              Request a new reset
            </Link>
            .
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
            {success} Redirecting to login…
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-[#1a2b4b] mb-2">New password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Min 6 characters"
                className="w-full bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-12"
                required
                minLength={6}
                autoComplete="new-password"
                disabled={!token}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1a2b4b] mb-2">Confirm password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              placeholder="Confirm new password"
              className="w-full bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
              autoComplete="new-password"
              disabled={!token}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-[#1a2b4b] text-white font-bold py-4 rounded-xl hover:bg-[#253a63] transition-colors shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-600">
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
