/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { auth } from "../../index"



export const ProtectedRoute = ({ children, user }) => {
  if (!auth.currentUser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login"></Navigate>;
  }
  return user ? children : <Navigate to="/"></Navigate>;
};

