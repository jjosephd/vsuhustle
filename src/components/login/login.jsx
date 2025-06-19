// src/pages/Login.jsx
import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import errorHandler from '../../utils/error/errorHandler';
import { updateProfile } from 'firebase/auth';
import { initializeUserProfile } from '../../utils/firestore/listings';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        // Set Firebase Auth displayName (optional, here using email prefix)
        const nameFromEmail = email.split('@')[0];
        await updateProfile(user, {
          displayName,
        });

        // Initialize Firestore user profile
        await initializeUserProfile(user);

        console.log('✅ Registration successful:', user);
        navigate('/businesses');
      }
    } catch (err) {
      errorHandler.firebase(
        err,
        isRegister ? 'Registration failed' : 'Login failed'
      );
      setError(err.message); // optional: for displaying inline
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isRegister ? 'Register' : 'Login'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {isRegister && (
          <input
            className="border p-2"
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        )}
        <input
          className="border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white py-2 rounded" type="submit">
          {isRegister ? 'Create Account' : 'Log In'}
        </button>
      </form>
      <button
        className="text-sm text-blue-500 mt-2 underline"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? 'Already have an account? Log in'
          : 'Need an account? Register'}
      </button>
    </div>
  );
};

export default Login;
