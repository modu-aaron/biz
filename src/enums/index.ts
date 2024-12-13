import { Company } from "@/types/payment";

export enum SettlementReportRouteName {
  SIGN_IN = "SettlementUserAuthorization",
  REPORT = "SettlementReport",
  BLANK = "SettlementReportBlank",
}

export enum TargetType {
  PARTNER = "P",
  SHARE = "S",
  GU = "G",
}

export enum SettlementTargetType {
  PARKINGLOT = "P",
  SHARED_GU_PARKINGLOT = "G",
  SHARED_NORMAL_PARKINGLOT = "S",
  BIZ_PARTNER = "B",
}

export enum SummaryType {
  GU = "GU",
  GROSS = "GROSS",
  NET = "NET",
}

export enum ExcelStatus {
  COMPLETED = "completed",
  WAITING = "waiting",
  ACTIVE = "active",
  DELAYED = "delayed",
  FAILED = "failed",
  PAUSED = "paused",
}

export enum SettlementTableName {
  TARGET = "target",
  SUMMARY = "summary",
  COMPLEMENTS = "complements",
  PARKINGLOT_SUMMARY = "parkinglot-summary",
  SETTLEMENTS = "settlements",
  GU = "gu",
}

export enum DateFormat {
  DAY_YYYY_MM_DD_DASH = "yyyy-MM-dd",
  TIME_HH_MM_SS_COLON = "HH:mm:ss",
}

export enum Layout {
  PAGE = "PAGE",
  MENU = "MENU",
}

export enum ErrorCode {
  NOT_SIGNED_UP = 90002,
  INVALID_EMAIL_OR_PW = 10101,
}

export enum PartnerCenterMenu {
  MONTHLY_PARKING_USER_LIST = "MONTHLY_PARKING_USER_LIST",
  MONTHLY_PARKING_REQUEST_LIST = "MONTHLY_PARKING_REQUEST_LIST",
  MONTHLY_PARKING_REQUEST_WRITE = "MONTHLY_PARKING_REQUEST_WRITE",
  MONTHLY_PARKING_EXTEND_REQUEST_WRITE = "MONTHLY_PARKING_EXTEND_REQUEST_WRITE",
  PAYMENT_LIST = "PAYMENT_LIST",
  PAYMENT_DETAIL = "PAYMENT_DETAIL",
  PARTNER_DETAIL = "PARTNER_DETAIL",
  PARTNER_MEMBER_LIST = "PARTNER_MEMBER_LIST",
  USER_PROFILE = "USER_PROFILE",
}

export enum UserRole {
  ADMIN = "관리자",
  MEMBER = "멤버",
}

export enum MonthlyParkingRequestTypeCode {
  NEW = 100,
  EXTEND = 110,
  CHANGE_CAR = 200,
  CHANGE_USER = 210,
  CANCEL = 200,
  STOP = 310,
}

export enum MonthlyParkingRequestType {
  NEW = "신규",
  EXTEND = "연장",
  CHANGE_CAR = "차량변경",
  CHANGE_USER = "이용자변경",
  CANCEL = "취소",
  STOP = "중도취소",
}

export enum MonthlyParkingUseStatusCode {
  WAIT = 100,
  USING = 200,
  END = 300,
}

export enum MonthlyParkingUseStatus {
  WAIT = "대기",
  USING = "사용중",
  END = "종료",
}

export enum MonthlyParkingRequestStatusCode {
  WAIT = 100,
  RECEIVE = 150,
  SEND = 160,
  ALLOW = 200,
  DENY = 210,
  CANCEL = 220,
}

export enum MonthlyParkingRequestStatus {
  WAIT = "대기",
  RECEIVE = "접수중",
  SEND = "현장접수",
  ALLOW = "승인",
  DENY = "반려",
  CANCEL = "이용취소",
}

export enum PaymentMethodCode {
  CARD = 100,
  ACCOUNT = 200,
}

export enum PaymentMethod {
  CARD = "카드",
  ACCOUNT = "후불계좌입금",
}

export enum PaymentStatusCode {
  DONE = 100,
  PARTIAL_CANCEL = 200,
  CANCEL = 300,
}

export enum PaymentStatus {
  DONE = "결제완료",
  PARTIAL_CANCEL = "부분취소",
  CANCEL = "전취소",
}

export enum PaymentTypeCode {
  CARD_PARTNER = 100,
  CARD_MEMBER = 200,
  POST_PAID_ACCOUNT = 300,
}

export enum PaymentType {
  CARD_PARTNER = "대표카드결제",
  CARD_MEMBER = "멤버개별카드",
  POST_PAID_ACCOUNT = "후불계좌입금",
}

export enum MonthlyParkingCreatorTypeCode {
  PARTNER_USER = 100,
  ADMIN = 200,
  SYSTEM = 300,
}

export enum PartnerCenterPermission {
  PROFILE_VIEW = "PROFILE_VIEW",
  PROFILE_UPDATE = "PROFILE_UPDATE",
  TICKET_REQUEST_LIST = "TICKET_REQUEST_LIST",
  TICKET_REQUEST_VIEW = "TICKET_REQUEST_VIEW",
  TICKET_REQUEST_CREATE = "TICKET_REQUEST_CREATE",
  TICKET_LIST = "TICKET_LIST",
  TICKET_UPDATE = "TICKET_UPDATE",
  PAYMENT_LIST = "PAYMENT_LIST",
  PAYMENT_VIEW = "PAYMENT_VIEW",
  PARTNER_VIEW = "PARTNER_VIEW",
  MEMBER_LIST = "MEMBER_LIST",
  CARD_CREATE = "CARD_CREATE",
  TICKET_CONTRACT_LIST = "TICKET_CONTRACT_LIST",
}

export enum PaymentOrderTargetTypeCode {
  TICKET_REQUEST = 100,
}

export enum PartnerTicketTypeCode {
  MONTHLY_REGULAR = 200,
  MONTHLY_RANGE = 210,
}

export enum PartnerTicketType {
  MONTHLY_REGULAR = "월단위권",
  MONTHLY_RANGE = "월기간권",
}

type CardCompanyColor = {
  [key in Company]: string;
};

export const CARD_BACKGROUND_COLOR: CardCompanyColor = {
  현대카드: "#030303",
  BC카드: "#F04651",
  신한카드: "#0046ff",
  카카오뱅크: "#fee300",
  하나카드: "#1DB8B3",
  우리카드: "#42add7",
  국민카드: "#8C8176",
  롯데카드: "#e60013",
};
