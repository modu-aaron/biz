import { Type } from "class-transformer";
import { Paginated } from "@/services/api/dto/common.dto";
import type {
  MonthlyParkingCreatorTypeCode,
  MonthlyParkingRequestStatusCode,
  MonthlyParkingRequestTypeCode,
  MonthlyParkingUseStatusCode,
} from "@/enums";
import type { MonthlyParkingRequestFormModel } from "@/services/api/ticket/ticket.model";

class PartnerTicketProductDto {
  ptpSeq!: number;
  name!: string;
  parkinglot!: {
    parkinglotSeq: number;
    parkinglotName: string;
  };
}

class PartnerTicketDto {
  ptSeq!: number;
  partnerTicketProduct!: PartnerTicketProductDto;
  creator!: MonthlyParkingCreator;
}

export class MonthlyParkingUsersParamsReqDto {
  carNum?: string;
  ptSeq?: string;
  userPhone?: string;
  remainingDays?: number;
  status?: MonthlyParkingUseStatusCode;
  offset!: number;
  limit!: number;
}

export class MonthlyParkingRequestParamsReqDto {
  carNum?: string;
  ptSeq?: string;
  userPhone?: string;
  status?: MonthlyParkingRequestStatusCode;
  puSeq?: number;
  offset!: number;
  limit!: number;
}

export class MonthlyParkingTicketContractsParamsReqDto {
  productName?: string;
  parkinglotName?: string;
  offset!: number;
  limit!: number;
}

export class MonthlyParkingRequestListDto {
  ptrSeq!: number;
  ptSeq!: number;
  status!: MonthlyParkingRequestStatusCode;
  userName!: string;
  userPhone!: string;
  type!: MonthlyParkingRequestTypeCode;
  carNum!: string;
  carModel!: string;
  useStartDate!: string;
  useEndDate!: string;
  creatorType!: MonthlyParkingCreatorTypeCode;
  createdAt!: string;
  partnerTicket!: PartnerTicketDto;
}

export class MonthlyParkingUserDto {
  ptSeq!: number;
  carNum!: string;
  carModel!: string;
  userName!: string;
  userPhone!: string;
  useStartDate!: string;
  useEndDate!: string;
  remainingDays!: number;
  partnerTicketProduct!: Pick<PartnerTicket, "ptpSeq" | "name"> & {
    parkinglot: Pick<ParkingLot, "parkinglotSeq" | "name">;
  };
  creator!: MonthlyParkingCreator;
  status!: MonthlyParkingUseStatusCode;
  isAutoExtend!: boolean;
  extend!: {
    isAble: boolean;
    reason: string | null;
  };
  partnerTicketContract!: {
    ptcSeq: number;
    extendDiscountUnitPrice: number | null;
  };
}

export class MonthlyParkingTicketContractDto {
  ptcSeq!: number;
  quantity!: number;
  soldQuantity!: number;
  parkinglot!: ParkingLot;
  discountUnitPrice!: number;
  discountExtendUnitPrice!: number;
  partnerTicketProduct!: PartnerTicket;
}

export class CreateMonthlyParkingRequestsBodyReqDto {
  totalPrice!: number;
  ptcSeq!: number;
  requests!: MonthlyParkingRequestFormModel[];
}

export class CreateMonthlyParkingExtendRequestsBodyReqDto {
  ptSeqs!: number[];
}

export class UpdateAutoExtendStatusParamsReq {
  ptSeq!: number;
}

export class UpdateAutoExtendStatusBodyReqDto {
  isAutoExtend!: boolean;
}

export class MonthlyParkingRequestListsResDto extends Paginated {
  @Type(() => MonthlyParkingRequestListDto)
  results!: MonthlyParkingRequestListDto[];
}

export class MonthlyParkingUsersResDto extends Paginated {
  @Type(() => MonthlyParkingUserDto)
  results!: MonthlyParkingUserDto[];
}

export class MonthlyParkingTicketContractsResDto extends Paginated {
  @Type(() => MonthlyParkingTicketContractDto)
  results!: MonthlyParkingTicketContractDto[];
}

class PartnerTicket {
  ptpSeq!: number;
  unitMonth!: number | null;
  unitPrice!: number;
  extendUnitMonth!: number | null;
  extendUnitPrice!: number | null;
  ablePurchaseDate!: string;
  ableStartBeginDate!: string;
  ableStartUntilDate!: string;
  name!: string;
  caution!: string;
}

class ParkingLot {
  parkinglotSeq!: number;
  name!: string;
  address!: string;
  photos!: Photo[];
}

class Photo {
  width!: number;
  height!: number;
  url!: string;
}

class MonthlyParkingCreator {
  puSeq!: number;
  name!: string;
}
