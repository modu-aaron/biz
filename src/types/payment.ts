import type { PaymentCancelDto, PaymentOrderDto } from "./payment.ts";
import type {
  MonthlyParkingCreatorTypeCode,
  MonthlyParkingRequestStatusCode,
  MonthlyParkingRequestTypeCode,
  MonthlyParkingUseStatusCode,
} from "@/enums";

export interface IPaymentRefundOrder
  extends PaymentOrderDto,
    PaymentCancelDto {}

export interface IMakeMonthlyParkingRequestPayload {
  totalPrice: number;
  ptcSeq: number;
  requests: IMonthlyParkingRequestForm[];
}

export interface IMakeMonthlyParkingExtendRequestsPayload {
  ptSeqs: number[];
}

export interface IMonthlyParkingParams {
  carNum?: string;
  ptSeq?: string;
  userPhone?: string;
  remainingDays?: number;
  status?: MonthlyParkingUseStatusCode;
}

export interface IMonthlyParkingUser {
  ptSeq: number;
  carNum: string;
  carModel: string;
  userName: string;
  userPhone: string;
  useStartDate: string;
  useEndDate: string;
  remainingDays: number;
  partnerTicketProduct: Pick<IPartnerTicket, "ptpSeq" | "name"> & {
    parkinglot: Pick<IParkingLot, "parkinglotSeq" | "name">;
  };
  creator: IMonthlyParkingCreator;
  status: MonthlyParkingUseStatusCode;
  isAutoExtend: boolean;
  extend: {
    isAble: boolean;
    reason: string | null;
  };
  partnerTicketContract: {
    ptcSeq: number;
    extendDiscountUnitPrice: number | null;
  };
}

export interface IMonthlyParkingRequest {
  ptrSeq: number;
  ptSeq: number;
  status: MonthlyParkingRequestStatusCode;
  type: MonthlyParkingRequestTypeCode;
  carNum: string;
  carModel: string;
  useStartDate: string;
  useEndDate: string;
  creatorType: MonthlyParkingCreatorTypeCode;
  createdAt: string;
  partnerTicket: {
    ptSeq: number;
    partnerTicketProduct: Pick<IPartnerTicket, "ptpSeq" | "name"> & {
      parkinglot: {
        parkinglotSeq: number;
        parkinglotName: string; // TODO name 아닌지 확인
      };
    };
    creator: IMonthlyParkingCreator;
  };
}

export interface IMonthlyParkingCreator {
  puSeq: number;
  name: string;
}

export interface IPartnerTicket {
  ptpSeq: number;
  unitMonth: number | null;
  unitPrice: number;
  extendUnitMonth: number | null;
  extendUnitPrice: number | null;
  ablePurchaseDate: string;
  ableStartBeginDate: string;
  ableStartUntilDate: string;
  name: string;
  caution: string;
}

export interface IParkingLot {
  parkinglotSeq: number;
  name: string;
  address: string;
  photos: IPhoto[];
}

export interface IPhoto {
  width: number;
  height: number;
  url: string;
}

export interface IMonthlyParkingRequestForm {
  seq?: number | null;
  useStartDate: string;
  carNum: string;
  carModel: string;
  userName: string;
  userPhone: string;
}

export interface IPartnerTicketContract {
  ptcSeq: number;
  quantity: number;
  soldQuantity: number;
  parkinglot: IParkingLot;
  discountUnitPrice: number;
  discountExtendUnitPrice: number;
  partnerTicketProduct: IPartnerTicket;
}

export interface IUpdatePathVar {
  ptSeq: number;
}
export interface IUpdateAutoExtendPayloadType {
  ptSeq: number;
  data: { isAutoExtend: boolean };
}

export interface IMonthlyParkingCreator {
  puSeq: number;
  name: string;
}
