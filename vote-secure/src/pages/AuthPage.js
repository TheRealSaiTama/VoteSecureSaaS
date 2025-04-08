import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the intended mode from location state (signup or login)
  const initialMode = location.state?.mode || 'login';
  
  // Get the intended redirect path from location state
  const from = location.state?.from?.pathname || '/dashboard';
  
  useEffect(() => {
    // If user is already logged in, redirect them
    if (currentUser) {
      // Redirect to admin dashboard if user is admin, otherwise to user dashboard
      const redirectPath = currentUser.role === 'admin' ? '/admin' : '/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm initialMode={initialMode} />
    </div>
  );
};

export default AuthPage;