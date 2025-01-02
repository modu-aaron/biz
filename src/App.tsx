import { Outlet } from "react-router-dom";
import MainWrapper from "./components/shared/layout/MainWrapper";
import { ToastContainer } from "react-toastify";

function App() {
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
