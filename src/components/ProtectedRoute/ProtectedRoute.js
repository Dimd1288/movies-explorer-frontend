import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({loggedIn, children}) {
  return (
    !loggedIn ? <Navigate to="/signin" replace/> : children
)};

export default ProtectedRoute;