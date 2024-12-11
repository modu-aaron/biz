import { Type } from "class-transformer";
import { Paginated } from "@/services/api/dto/common.dto";
import type {
  PartnerTicketTypeCode,
  PaymentMethodCode,
  PaymentOrderTargetTypeCode,
  PaymentStatusCode,
} from "@/enums";
import type {
  IMonthlyParkingRequest,
  IPartnerTicket,
  IParkingLot,
  IMonthlyParkingCreator,
  IPaymentRefundOrder,
} from "@/types/payment";

export class PaymentPathVar {
  poSeq!: number;
}

export class RequestExcelStatusPayload {
  reason?: string;
}

export class PaymentParamsDto {
  from?: string;
  to?: string;
  limit!: number;
  offset!: number;
}

//결제 이력
export class PaymentsListDto extends Paginated {
  @Type(() => PaymentListDto)
  results!: PaymentListDto[];
}

//결제 상세
export class PaymentListDto {
  orderItemCount!: number;
  partner!: Pick<PaymentDto, "pSeq">;
  @Type(() => PaymentInfoDto)
  payment!: PaymentInfoDto;
  poSeq!: number;
  totalPrice!: number;
}

export class PaymentDto {
  address!: string;
  createdAt!: string;
  name!: string;
  pSeq!: number;
  @Type(() => PartnerCardDto)
  partnerCard!: PartnerCardDto;
  paymentTyp!: number;
}

export class PartnerCardDto {
  code!: string;
  memo!: string;
  name!: string;
  number!: string;
}

export class PaymentInfoDto {
  method!: number;
  methodName!: string;
  paidAt!: Date;
  receipt!: string;
  status!: PaymentStatusCode;
}

//결제 상세
export class PaymentDetailDto {
  poSeq!: number;
  totalPrice!: number;
  partner!: Pick<PaymentDto, "pSeq" | "name">;
  @Type(() => PaymentDetailInfoDto)
  payment!: PaymentDetailInfoDto;
  @Type(() => PaymentOrderDto)
  orderItems!: PaymentOrderDto[];
  refundOrderItems!: IPaymentRefundOrder[] | [];
}
export class PaymentDetailInfoDto {
  cancelPrice!: number;
  methodName!: string;
  paidAt!: string;
  method!: PaymentMethodCode;
  status!: PaymentStatusCode;
}

export class PaymentRefundOrderDto {
  poiSeq!: number;
  price!: number;
  targetType!: PaymentOrderTargetTypeCode;
  targetSeq!: number;
  partnerTicketRequest!: Pick<
    IMonthlyParkingRequest,
    "ptrSeq" | "useStartDate" | "useEndDate" | "partnerTicket"
  > & {
    isExtend: boolean;
    partnerTicket: Pick<IMonthlyParkingRequest["partnerTicket"], "ptSeq"> & {
      carNum: string;
      carModel: string;
      partnerTicketProduct: Pick<IPartnerTicket, "ptpSeq" | "name"> & {
        type: PartnerTicketTypeCode;
        parkinglot: Pick<IParkingLot, "parkinglotSeq" | "name">;
      };
    };
    creator: IMonthlyParkingCreator;
  };
  paymentCancel!: PaymentCancelDto;
}

export class PaymentOrderDto {
  poiSeq!: number;
  price!: number;
  targetType!: PaymentOrderTargetTypeCode;
  targetSeq!: number;
  partnerTicketRequest!: Pick<
    IMonthlyParkingRequest,
    "ptrSeq" | "useStartDate" | "useEndDate" | "partnerTicket"
  > & {
    isExtend: boolean;
    partnerTicket: Pick<IMonthlyParkingRequest["partnerTicket"], "ptSeq"> & {
      carNum: string;
      carModel: string;
      partnerTicketProduct: Pick<IPartnerTicket, "ptpSeq" | "name"> & {
        type: PartnerTicketTypeCode;
        parkinglot: Pick<IParkingLot, "parkinglotSeq" | "name">;
      };
    };
    creator: IMonthlyParkingCreator;
  };
  paymentCancel!: PaymentCancelDto;
}

export class PaymentCancelDto {
  ppSeq!: number;
  method!: PaymentMethodCode;
  canceledAt!: string;
}
