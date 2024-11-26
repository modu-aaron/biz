import {
  MonthlyParkingCreatorTypeCode,
  MonthlyParkingRequestStatusCode,
  MonthlyParkingRequestTypeCode,
} from "../../../enums/ticketRequest";
import { Paginated } from "../useageStatus/type";

export interface MonthlyParkingRequestParamsReqDto {
  carNum?: string;
  ptSeq?: string;
  userPhone?: string;
  status?: MonthlyParkingRequestStatusCode;
  puSeq?: number;
  offset: number;
  limit: number;
}

export interface MonthlyParkingRequestListsResDto extends Paginated {
  results: MonthlyParkingRequestListDto[];
}

export interface MonthlyParkingRequestListDto {
  ptrSeq: number;
  ptSeq: number;
  status: MonthlyParkingRequestStatusCode;
  userName: string;
  userPhone: string;
  type: MonthlyParkingRequestTypeCode;
  carNum: string;
  carModel: string;
  useStartDate: string;
  useEndDate: string;
  creatorType: MonthlyParkingCreatorTypeCode;
  createdAt: string;
  partnerTicket: PartnerTicketDto;
}

interface PartnerTicketDto {
  ptSeq: number;
  partnerTicketProduct: PartnerTicketProductDto;
  creator: MonthlyParkingCreator;
}

export interface MonthlyParkingCreator {
  puSeq: number;
  name: string;
}

interface PartnerTicketProductDto {
  ptpSeq: number;
  name: string;
  parkinglot: {
    parkinglotSeq: number;
    parkinglotName: string;
  };
}
