// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { initializeUserProfile } from '../../utils/firestore/listings';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents UI flash

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await initializeUserProfile(user); // Ensure user doc exists
        } catch (err) {
          console.error('Failed to initialize user profile:', err.message);
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, displayName: currentUser?.displayName }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
