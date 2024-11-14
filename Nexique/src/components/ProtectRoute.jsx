// ProtectedRoute.js
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // If user is not authenticated, navigate to /getstarted
      navigate('/getstarted');
    }
  }, [user, navigate]);

  return user ? children : null; // Render children if user is authenticated
};

export default ProtectedRoute;
