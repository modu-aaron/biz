import { Outlet, useNavigate } from "react-router-dom";
import MainWrapper from "@/shared/components/layout/MainWrapper";
import { useAuth } from "@/store/useAuth";
import { useEffect } from "react";

function App() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/signIn");
    }
  }, [isSignedIn]);

  return (
    <>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  );
}

export default App;
