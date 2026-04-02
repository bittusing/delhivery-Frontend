import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

/**
 * Google Identity Services button — must render under GoogleOAuthProvider.
 */
const GoogleSignInButton = ({ onCredential, label = 'continue_with' }) => {
  return (
    <div className="w-full min-h-[44px] flex justify-center [&_iframe]:!w-full">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const idToken = credentialResponse.credential;
          if (idToken) {
            onCredential(idToken);
          }
        }}
        onError={() => {
          onCredential(null, new Error('Google sign-in was cancelled or failed'));
        }}
        useOneTap={false}
        theme="outline"
        size="large"
        text={label}
        shape="rectangular"
        width="384"
      />
    </div>
  );
};

export default GoogleSignInButton;
