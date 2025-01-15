import { useState, useEffect } from "react";
import paymentService from "@/services/api/payment/index";
import { PaymentDetailDto } from "@/services/api/payment/payment.dto";

const usePayment = (id: string) => {
  const [data, setData] = useState<PaymentDetailDto | null>(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      const response = await paymentService.getPayment(Number(id));
      setData(response);
    };
    fetchPaymentData();
  }, [id]);

  return data;
};

export default usePayment;
