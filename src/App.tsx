import { Outlet, useNavigate } from "react-router-dom";
import MainWrapper from "@/shared/components/layout/MainWrapper";
import { useAuth } from "@/store/useAuth";

function App() {
  return (
    <>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  );
}

export default App;
