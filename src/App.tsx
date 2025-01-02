import { Outlet, useNavigate } from "react-router-dom";
import MainWrapper from "./components/shared/layout/MainWrapper";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
