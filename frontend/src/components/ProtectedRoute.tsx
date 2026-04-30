import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext.tsx";
import type { UserRole } from "../contextAPI/AuthContext.tsx";

interface ProtectedRouteProps {
  children: ReactElement;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
