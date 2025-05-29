import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../context/auth/AuthContext';

const LogoutButton = () => {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  if (!currentUser) return null;

  return (
    <button
      onClick={handleLogout}
      className="btn w-full text-secondary text-xs"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
