import App from "@/App";
import Partner from "@/pages/partner/Partner";
import Payments from "@/pages/payments/Payments";
import Payment from "@/pages/payment/Payment";
import SignIn from "@/pages/sign/SignIn";
import NotFound from "@/pages/NotFound";
import Ticket from "@/pages/ticket/Ticket";
import TicketRequest from "@/pages/ticket/TicketRequest";
import TicketRequestNew from "@/pages/ticket/TicketRequestNew";
import PartnerUser from "@/pages/partner/PartnerUser";
import UserProfile from "@/pages/profile/UserProfile";
import ProtectedRoute from "@/router/ProtectRoute";

export const routes = [
  {
    path: "signIn",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Payments /> },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "partner",
        element: (
          <ProtectedRoute>
            <Partner />
          </ProtectedRoute>
        ),
      },
      {
        path: "partner-user",
        element: (
          <ProtectedRoute>
            <PartnerUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "ticket",
        element: (
          <ProtectedRoute>
            <Ticket />
          </ProtectedRoute>
        ),
      },
      {
        path: "ticket-request",
        element: (
          <ProtectedRoute>
            <TicketRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "ticket-request/new",
        element: (
          <ProtectedRoute>
            <TicketRequestNew />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
