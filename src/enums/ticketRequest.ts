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

export enum MonthlyParkingRequestTypeCode {
  NEW = 100,
  EXTEND = 110,
  CHANGE_CAR = 200,
  CHANGE_USER = 210,
  STOP = 310,
}

export enum MonthlyParkingCreatorTypeCode {
  PARTNER_USER = 100,
  ADMIN = 200,
  SYSTEM = 300,
}
