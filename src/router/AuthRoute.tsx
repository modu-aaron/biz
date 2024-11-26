import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import { useEffect } from "react";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      console.log("User is not signed in");
    }
  }, [isSignedIn]);

  return isSignedIn ? children : <Navigate to={"/signIn"} replace />;
};

export default AuthRoute;
