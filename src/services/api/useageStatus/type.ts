import { MonthlyParkingUseStatusCode } from "../../../enums/route";

export interface MonthlyParkingUsersParamsReqDto {
  carNum?: string;
  ptSeq?: string;
  userPhone?: string;
  remainingDays?: number;
  status?: MonthlyParkingUseStatusCode;
  offset: number;
  limit: number;
}

export interface MonthlyParkingUsersResDto extends Paginated {
  results: MonthlyParkingUserDto[];
}

export interface MonthlyParkingUserDto {
  ptSeq: number;
  carNum: string;
  carModel: string;
  userName: string;
  userPhone: string;
  useStartDate: string;
  useEndDate: string;
  remainingDays: number;
  partnerTicketProduct: Pick<PartnerTicket, "ptpSeq" | "name"> & {
    parkinglot: Pick<ParkingLot, "parkinglotSeq" | "name">;
  };
  creator: MonthlyParkingCreator;
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

export interface Paginated {
  limit: number;
  offset: number;
  total: number;
}

export interface PartnerTicket {
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

export interface ParkingLot {
  parkinglotSeq: number;
  name: string;
  address: string;
  photos: Photo[];
}

export interface Photo {
  width: number;
  height: number;
  url: string;
}

export interface MonthlyParkingCreator {
  puSeq: number;
  name: string;
}
