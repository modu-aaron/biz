import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Partner from "../pages/partner/Partner";
import Payment from "../pages/payment/Payment";
import SignIn from "../pages/sign/SignIn";
import NotFound from "../pages/NotFound";
import Ticket from "../pages/ticket/Ticket";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
