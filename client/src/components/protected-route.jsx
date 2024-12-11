// logic to implement pages only accessible by users with an account (user profile, game play)

import React from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated, children}) => {
  return isAuthenticated ? children : <Navigate to="/login"/>;
};

export default ProtectedRoute;
