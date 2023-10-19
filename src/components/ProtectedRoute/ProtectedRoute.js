import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  return (props.notFound === true
    ? (<Navigate to="/*" replace />)
    : (props.isLoggedIn ? (<Component {...props} />)
      : (<Navigate to="/" replace />)));
};

export default ProtectedRoute;
