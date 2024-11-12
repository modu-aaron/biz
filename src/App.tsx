import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAxiosInterceptor from "./services/axios/intercept";

function App() {
  const navigate = useNavigate();
  useAxiosInterceptor();

  useEffect(() => {
    navigate("/signIn");
  }, [navigate]);

  return <Outlet />;
}

export default App;
