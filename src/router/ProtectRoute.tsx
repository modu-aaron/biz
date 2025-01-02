import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/store/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;
