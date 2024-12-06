import axios from "../../axios";
import type {
  PaymentPathVar,
  PaymentParamsDto,
  RequestExcelStatusPayload,
} from "./payment.dto";
import { PaymentDetailDto, PaymentsListDto } from "./payment.dto";
import { plainToInstance } from "class-transformer";

/**
 * 결제 목록
 * @return {offset: number,limit: number,total: number,results: PaymentListDto[]}
 */
const getPayments = async (
  params: PaymentParamsDto
): Promise<PaymentsListDto> => {
  const { data } = await axios.get("/payment", { params });
  return plainToInstance(PaymentsListDto, data);
};

/**
 * 결제 상세
 * @return { PaymentDetailDto }
 */
const getPayment = async (
  pathVar: PaymentPathVar["poSeq"]
): Promise<PaymentDetailDto> => {
  const { data } = await axios.get(`/payment/${pathVar}`);
  return plainToInstance(PaymentDetailDto, data);
};

/**
 * 결제 상세 액셀 요청
 * @payload {poSeq: number}
 */
const getPaymentOrderItemsExcel = async (
  pathVar: PaymentPathVar["poSeq"],
  reason: RequestExcelStatusPayload["reason"]
) => {
  const { data } = await axios.post(`/payment/${pathVar}/excel`, {
    reason: reason,
  });
  return data;
};

export default {
  getPayments,
  getPayment,
  getPaymentOrderItemsExcel,
};
