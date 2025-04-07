import { auth } from '../firebase';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Real-time sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user'
        };
        setCurrentUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('voteSecureUser', JSON.stringify(userData));
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('voteSecureUser');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function - in a real app, this would validate with a backend
  const login = async (email, password) => {
    // Simulating API call with some mock users
    const mockUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      },
      {
        id: 2,
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      },
      {
        id: 3,
        name: 'Organizer User',
        email: 'organizer@example.com',
        role: 'organizer'
      }
    ];

    // For demo purposes, we'll accept any email that matches our mock users
    // and any password
    const user = mockUsers.find(user => user.email === email);
    
    if (user) {
      // Store user in local storage for persistence
      localStorage.setItem('voteSecureUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } else {
      return { 
        success: false, 
        error: 'Invalid email or password.'
      };
    }
  };

  // Register function - in a real app, this would create a new user via API
  const register = async (name, email, password) => {
    // Simulating API call
    // In a real application, this would create a new user in the database
    
    // For demo, let's check if the email already exists in our mock users
    const mockEmails = ['admin@example.com', 'user@example.com', 'organizer@example.com'];
    
    if (mockEmails.includes(email)) {
      return {
        success: false,
        error: 'Email already in use.'
      };
    }

    // Create a new user
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 4, // Random ID for demo
      name,
      email,
      role: 'user' // New users get 'user' role by default
    };

    // Store user in local storage for persistence
    localStorage.setItem('voteSecureUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    
    return { success: true, user: newUser };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('voteSecureUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Check if a user has specific permissions
  const hasPermission = (permission) => {
    if (!currentUser) return false;
    
    // Simple role-based permission check
    switch (permission) {
      case 'view_admin':
        return currentUser.role === 'admin';
      case 'create_poll':
        return ['admin', 'organizer'].includes(currentUser.role);
      case 'vote':
        return ['admin', 'organizer', 'user'].includes(currentUser.role);
      default:
        return false;
    }
  };

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    hasPermission,
    setCurrentUser,
    setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
