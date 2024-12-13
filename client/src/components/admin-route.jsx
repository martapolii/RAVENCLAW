// logic for pages that will only be accessible by users with an admin role (admin questions, admin users)

import React from 'react';
import {Navigate} from 'react-router-dom';

const AdminRoute = ({isAdmin, children}) => {
  return isAdmin ? children : <Navigate to="/"/>;
};

export default AdminRoute;
