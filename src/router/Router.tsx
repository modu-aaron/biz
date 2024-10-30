import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Partner from "../pages/partner/Partner";
import Payment from "../pages/payment/Payment";
import SignIn from "../pages/sign/SignIn";
import NotFound from "../pages/NotFound";

const Router = () => {
  const isSignIn = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        {isSignIn ? (
          <>
            <Route path="/" element={<App />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/partner" element={<Partner />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signIn" replace />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
