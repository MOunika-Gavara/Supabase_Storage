// AuthComponent.js
import React from 'react';
import { signInWithGoogle, signOut, checkAuthenticated } from './auth';

const AuthComponent = () => {
  const handleSignIn = async () => {
    const { user, error } = await signInWithGoogle();
    if (error) {
      console.error('Google authentication error:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      {checkAuthenticated() ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default AuthComponent;
