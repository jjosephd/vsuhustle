// src/routes/private-route.jsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/auth/AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
