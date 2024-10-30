import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  isSign: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isSign,
  redirectTo,
  ...props
}) => {
  return isSign ? <Route {...props} /> : <Redirect to={redirectTo} />;
};

export default ProtectedRoute;
