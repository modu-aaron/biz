import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "@/App";
import Partner from "@/pages/partner/Partner";
import Payment from "@/pages/payment/Payment";
import SignIn from "@/pages/sign/SignIn";
import NotFound from "@/pages/NotFound";
import Ticket from "@/pages/ticket/Ticket";
import AuthRoute from "@/router/AuthRoute";
import TicketRequest from "@/pages/ticket/TicketRequest";
import TicketRequestNew from "@/pages/ticket/TicketRequestNew";
import PartnerUser from "@/pages/partner/PartnerUser";
import UserProfile from "@/pages/profile/UserProfile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route
          path="/payment"
          element={
            <AuthRoute>
              <Payment />
            </AuthRoute>
          }
        />
        <Route
          path="/partner"
          element={
            <AuthRoute>
              <Partner />
            </AuthRoute>
          }
        />
        <Route
          path="/partner-user"
          element={
            <AuthRoute>
              <PartnerUser />
            </AuthRoute>
          }
        />
        <Route
          path="/ticket"
          element={
            <AuthRoute>
              <Ticket />
            </AuthRoute>
          }
        />
        <Route
          path="/ticket-request"
          element={
            <AuthRoute>
              <TicketRequest />
            </AuthRoute>
          }
        />
        <Route
          path="/ticket-request/new"
          element={
            <AuthRoute>
              <TicketRequestNew />
            </AuthRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
