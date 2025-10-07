import React from "react";
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children }) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    currentUser.loggedIn ? children : <Navigate to='/sign-in' replace />
  );
};

export default ProtectedRoute;