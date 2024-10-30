import { CSSProperties, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useSpinner } from "./store/useSpinner";

function App() {
  // const navigate = useNavigate();
  const { isLoading } = useSpinner();

  const override: CSSProperties = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderColor: "red",
  };

  // useEffect(() => {
  //   navigate("/signIn");
  // }, [navigate]);

  return (
    <>
      <Outlet />
      <PulseLoader
        color="#000"
        cssOverride={override}
        loading={isLoading}
        size={10}
        margin={3}
        speedMultiplier={0.75}
      />
    </>
  );
}

export default App;
