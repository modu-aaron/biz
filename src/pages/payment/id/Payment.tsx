import { PaymentDetailDto } from "@/services/api/payment/payment.dto";
import BaseTitle from "@/shared/components/BaseTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import paymentService from "@/services/api/payment/index";
import ListTable from "@/shared/components/ListTable";
import { DateFormat, PartnerTicketType, PartnerTicketTypeCode } from "@/enums";
import { convertToDate, getStatusByCode } from "@/utils/date";

const Payments = () => {
  const [data, setData] = useState<PaymentDetailDto | null>(null);
  const id = useParams().id;
  useEffect(() => {
    const getPaymentData = async () => {
      const res = await paymentService.getPayment(Number(id));
      setData(res);
    };
    getPaymentData();
  }, []);

  const paymentDetailHeaders = [
    { value: "poSeq", name: "결제번호" },
    { value: "partnerName", name: "결제그룹" },
    { value: "totalPrice", name: "결제금액" },
    { value: "cancelPrice", name: "결제취소금액" },
    { value: "paymentMethod", name: "결제수단" },
    { value: "status", name: "결제상태" },
    { value: "paidAt", name: "결제승인일시" },
  ];

  const generateTableBody = () => {
    if (!data) return [];
    const result = [
      {
        poSeq: { value: data.poSeq, type: "string" },
        partnerName: { value: data.partner.name, type: "string" },
        totalPrice: { value: data.totalPrice, type: "string" },
        cancelPrice: { value: data.payment.cancelPrice, type: "string" },
        paymentMethod: { value: data.payment.method, type: "string" },
        status: { value: data.payment.status, type: "string" },
        paidAt: {
          value: convertToDate(
            data.payment.paidAt,
            `${DateFormat.DAY_YYYY_MM_DD_DASH} ${DateFormat.TIME_HH_MM_SS_COLON}`
          ),
          type: "string",
        },
      },
    ];
    return result;
  };

  const paymentDetailTableBody = generateTableBody();

  const orderDetailTableHeader = [
    { value: "ptrSeq", name: "신청번호" },
    { value: "ptSeq", name: "주차권 번호" },
    { value: "type", name: "상품유형" },
    { value: "isExtend", name: "상세" },
    { value: "carNum", name: "차량번호" },
    { value: "carModel", name: "차 모델명" },
    { value: "parkingLotName", name: "주차장명" },
    { value: "ticketName", name: "주차권명" },
  ];

  const generateOrderItemTableBody = () => {
    if (!data) return [];
    const { orderItems } = data;
    return orderItems.map((item) => {
      const { partnerTicketRequest } = item;
      return {
        ptrSeq: { value: item.targetSeq, type: "string" },
        ptSeq: {
          value: partnerTicketRequest.partnerTicket.ptSeq,
          type: "string",
        },
        type: {
          value: getStatusByCode(
            partnerTicketRequest.partnerTicket.partnerTicketProduct.type,
            PartnerTicketTypeCode,
            PartnerTicketType
          ),
          type: "string",
        },
        isExtend: {
          value: partnerTicketRequest.isExtend ? "연장" : "신규",
          type: "string",
        },
        carNum: {
          value: partnerTicketRequest.partnerTicket.carNum,
          type: "string",
        },
        carModel: {
          value: partnerTicketRequest.partnerTicket.carModel,
          type: "string",
        },
        parkingLotName: {
          value:
            partnerTicketRequest.partnerTicket.partnerTicketProduct.parkinglot
              .name,
          type: "string",
        },
        ticketName: {
          value: partnerTicketRequest.partnerTicket.partnerTicketProduct.name,
          type: "string",
        },
      };
    });
  };

  const orderDetailTableBody = generateOrderItemTableBody();

  return (
    <>
      <BaseTitle text="결제상세" />
      <div className="flex flex-col gap-6">
        <div className="px-6 py-3 border border-gray-100">
          <h2 className="text-lg font-semibold mb-2">결제 정보</h2>
          <ListTable
            headers={paymentDetailHeaders}
            body={paymentDetailTableBody}
          />
        </div>
        <div className="px-6 py-3 border border-gray-100">
          <h2 className="text-lg font-semibold mb-2">구매 주차권 상세내역</h2>
          <ListTable
            headers={orderDetailTableHeader}
            body={orderDetailTableBody}
          />
        </div>
      </div>
    </>
  );
};

export default Payments;
