// src/routes/private-route.jsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/auth/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // or show a spinner here

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
