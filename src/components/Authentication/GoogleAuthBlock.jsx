import React from 'react';
import GoogleSignInButton from './GoogleSignInButton';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

/**
 * Shows divider + Google button when REACT_APP_GOOGLE_CLIENT_ID is set;
 * otherwise shows setup instructions so the section is never “missing”.
 */
const GoogleAuthBlock = ({ variant = 'login', onCredential, setError, setLoading }) => {
  const dividerLabel = variant === 'signup' ? 'Or sign up with' : 'Or continue with';

  const handleCredential = async (idToken, err) => {
    if (err || !idToken) {
      setError(err?.message || 'Google sign-in failed. Please try again.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await Promise.resolve(onCredential(idToken));
    } catch (e) {
      setError(e.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="bg-white px-3 text-slate-500">{dividerLabel}</span>
        </div>
      </div>

      {googleClientId ? (
        <GoogleSignInButton
          label={variant === 'signup' ? 'signup_with' : 'continue_with'}
          onCredential={handleCredential}
        />
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs leading-relaxed text-amber-900">
          <p className="font-semibold text-amber-950">Google sign-in is not configured</p>
          <p className="mt-2 text-left break-words">
            Add the same Web Client ID to{' '}
            <code className="rounded bg-white px-1 py-0.5 text-[11px]">public/.env</code> as{' '}
            <code className="rounded bg-white px-1 py-0.5 text-[11px]">REACT_APP_GOOGLE_CLIENT_ID=...</code>{' '}
            and the same value as{' '}
            <code className="rounded bg-white px-1 py-0.5 text-[11px]">GOOGLE_CLIENT_ID</code> in{' '}
            <code className="rounded bg-white px-1 py-0.5 text-[11px]">backend/.env</code>.
            Restart <code className="rounded bg-white px-1 py-0.5 text-[11px]">npm start</code> after
            changing env.
          </p>
        </div>
      )}
    </>
  );
};

export default GoogleAuthBlock;
