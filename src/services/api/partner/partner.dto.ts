import { Type } from "class-transformer";
import { Paginated } from "@/services/api/dto/common.dto";

export class UserDto {
  puSeq!: number;
  name!: string;
  phone!: string;
  roleName!: string;
  status!: string;
  activatedAt!: Date;
}

export class PartnerCardDto {
  name!: string;
  number!: string | null;
}

export class PartnerDto {
  pSeq!: number;
  name!: string;
  address!: string;
  paymentType!: number;
  @Type(() => PartnerCardDto)
  partnerCard!: PartnerCardDto | null;
  createdAt!: Date;
}

export class PartnerMemberDto extends Paginated {
  @Type(() => UserDto)
  results!: UserDto[];
}

export class AddCardPayloadDto {
  cardNumber!: string;
  expYear!: string;
  expMonth!: string;
  authNumber!: string;
}

export class UpdateUserPayloadDto {
  name!: string;
  phone!: string;
}
