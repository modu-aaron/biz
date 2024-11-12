import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signIn");
  }, [navigate]);

  return <Outlet />;
}

export default App;
