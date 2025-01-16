// utils/paymentTableData.ts
import { PaymentDetailDto } from "@/services/api/payment/payment.dto";
import { DateFormat, PartnerTicketType, PartnerTicketTypeCode } from "@/enums";
import { convertToDate } from "@/utils/date";
import { getStatusByCode } from "@/utils/common";

const generatePaymentDetailTableBody = (data: PaymentDetailDto | null) => {
  if (!data) return [];
  return [
    {
      poSeq: { value: data.poSeq, type: "string" },
      partnerName: { value: data.partner.name, type: "string" },
      totalPrice: {
        value: `${data.totalPrice.toLocaleString()}원`,
        type: "string",
      },
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
};

const generateOrderItemTableBody = (data: PaymentDetailDto | null) => {
  if (!data) return [];
  return data.orderItems.map((item) => {
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
      useStartDate: {
        value: convertToDate(
          partnerTicketRequest.useStartDate,
          DateFormat.DAY_YYYY_MM_DD_DASH
        ),
        type: "string",
      },
      useEndDate: {
        value: convertToDate(
          partnerTicketRequest.useEndDate,
          DateFormat.DAY_YYYY_MM_DD_DASH
        ),
        type: "string",
      },
      price: { value: `${item.price.toLocaleString()}원`, type: "string" },
      creatorName: { value: partnerTicketRequest.creator.name, type: "string" },
    };
  });
};

export { generatePaymentDetailTableBody, generateOrderItemTableBody };
