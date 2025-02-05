import { Outlet, useNavigate } from "react-router-dom";
import MainWrapper from "@/shared/components/layout/MainWrapper";
import { useAuth } from "@/store/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

function App() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/signIn");
      toast.error("로그인이 필요합니다.");
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
