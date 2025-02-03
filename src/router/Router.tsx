import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "@/router/RoutesConfig";

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
      </BrowserRouter>
    </>
  );
};

export default Router;
