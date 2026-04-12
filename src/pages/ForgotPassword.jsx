import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const message = await requestPasswordReset(email);
      setSuccess(message);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 max-w-xl w-full">
        <h2 className="text-2xl font-bold text-[#1a2b4b] mb-2">Forgot password</h2>
        <p className="text-sm text-slate-600 mb-6">
          Enter your account email and we will send you a link to reset your password if an account exists.
        </p>
        <div className="h-1 w-full bg-slate-100 mb-8 rounded-full" />

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-[#1a2b4b] mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              className="w-full bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a2b4b] text-white font-bold py-4 rounded-xl hover:bg-[#253a63] transition-colors shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending…' : 'Send reset link'}
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

export default ForgotPasswordPage;
