import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "@/router/RoutesConfig";
import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              children={route.children?.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                  index={child.index}
                />
              ))}
            />
          ))}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={true}
          pauseOnFocusLoss
          draggable
        />
      </BrowserRouter>
    </>
  );
};

export default Router;
