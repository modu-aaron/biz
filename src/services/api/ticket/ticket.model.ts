import { Expose, Transform } from "class-transformer";
// import { format } from 'date-fns'
// import { getNameByValue } from '@/utils'
// import { monthlyParkingRequestStatusOptions, monthlyParkingRequestTypeOptions, monthlyParkingUseStatusOptions } from '@/utils/monthlyParkingUsers'
// import { DateFormat } from '@/enums'

// export class MonthlyParkingListsModel {
//   @Transform(({ obj }) => obj.type)
//   @Transform(({ value }) => getNameByValue(value, monthlyParkingRequestTypeOptions))
//   type!: string

//   @Expose()
//   @Transform(({ obj }) => obj.partnerTicket.creator.name)
//   creator!: string

//   @Transform(({ obj }) => obj.status)
//   @Transform(({ value }) => getNameByValue(value, monthlyParkingRequestStatusOptions))
//   status!: string

//   @Expose({ name: 'parkingLotName' })
//   @Transform(({ obj }) => obj.partnerTicket.partnerTicketProduct.parkinglot.parkinglotName)
//   parkingLotName!: string

//   @Expose({ name: 'partnerTicketName' })
//   @Transform(({ obj }) => obj.partnerTicket.partnerTicketProduct.name)
//   @Transform(({ value }) => value)
//   partnerTicketName!: string

//   @Transform(({ obj }) => format(new Date(obj.createdAt), DateFormat.DAY_YYYY_MM_DD_DASH))
//   createdAt!: string
// }

// export class MonthlyParkingUsersModel {
//   @Expose({ name: 'parkingLotName' })
//   @Transform(({ obj }) => obj.partnerTicketProduct.parkinglot.name)
//   parkingLotName!: string

//   @Expose({ name: 'partnerTicketName' })
//   @Transform(({ obj }) => obj.partnerTicketProduct.name)
//   partnerTicketName!: string

//   @Expose({ name: 'creator' })
//   @Transform(({ obj }) => obj.creator.name)
//   creator!: string

//   @Transform(({ obj }) => obj.remainingDays)
//   @Transform(({ value }) => `${value}일`)
//   remainingDays!: string

//   @Transform(({ obj }) => obj.status)
//   @Transform(({ value }) => getNameByValue(value, monthlyParkingUseStatusOptions))
//   status!: string

//   @Transform(({ obj }) => obj.extend)
//   @Transform(({ value }) => ({ value: value.isAble ? '가능' : '불가', color: !value.isAble ? 'red' : '' }))
//   extend!: { value: string; color: string }

//   @Expose({ name: 'reason' })
//   @Transform(({ obj }) => obj.extend.reason)
//   reason!: string

//   @Transform(({ obj }) => obj.isAutoExtend)
//   @Transform(({ value }) => ({ value: value.toString(), name: value ? 'Y' : 'N' }))
//   isAutoExtend!: { value: string; name: string }

//   @Expose({ name: 'isExtend' })
//   @Transform(({ obj }) => obj.extend.isAble)
//   isExtend!: boolean
// }

export class MonthlyParkingTicketContractsModel {
  @Expose({ name: "parkingLotName" })
  @Transform(({ obj }) => obj.parkinglot.name)
  parkingLotName!: string;

  @Expose({ name: "ticketName" })
  @Transform(({ obj }) => obj.partnerTicketProduct.name)
  ticketName!: string;
}

export class MonthlyParkingRequestFormModel {
  seq?: number | null;
  useStartDate!: string;
  carNum!: string;
  carModel!: string;
  userName!: string;
  userPhone!: string;
}
