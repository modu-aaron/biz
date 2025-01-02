import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "@/App";
import Partner from "@/pages/partner/Partner";
import Payment from "@/pages/payment/Payment";
import SignIn from "@/pages/sign/SignIn";
import NotFound from "@/pages/NotFound";
import Ticket from "@/pages/ticket/Ticket";
import TicketRequest from "@/pages/ticket/TicketRequest";
import TicketRequestNew from "@/pages/ticket/TicketRequestNew";
import PartnerUser from "@/pages/partner/PartnerUser";
import UserProfile from "@/pages/profile/UserProfile";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/store/useAuth";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/signIn" replace />;
};

const Router = () => {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner"
            element={
              <ProtectedRoute>
                <Partner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner-user"
            element={
              <ProtectedRoute>
                <PartnerUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket"
            element={
              <ProtectedRoute>
                <Ticket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket-request"
            element={
              <ProtectedRoute>
                <TicketRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket-request/new"
            element={
              <ProtectedRoute>
                <TicketRequestNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
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
};

export default Router;
