import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DemoButton from './components/layout/DemoButton';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

// Dashboard Components
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ProfileDashboard from './components/dashboard/ProfileDashboard';
 

// Protected Route wrapper component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }
  
  if (adminOnly && currentUser?.role !== 'admin') {
    // Redirect to user dashboard if trying to access admin routes without admin role
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        <Footer />
        <DemoButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
