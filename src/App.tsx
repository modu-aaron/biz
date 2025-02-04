import { Outlet } from "react-router-dom";
import MainWrapper from "@/shared/components/layout/MainWrapper";

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
