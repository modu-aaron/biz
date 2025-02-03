import "reflect-metadata";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "@/router/Router";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
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
  </StrictMode>
);
