import axios from "@/services/axios";
import { plainToInstance } from "class-transformer";
import type {
  UpdateUserPayloadDto,
  AddCardPayloadDto,
} from "@/services/api/partner/partner.dto";
import {
  UserDto,
  PartnerDto,
  PartnerMemberDto,
} from "@/services/api/partner/partner.dto";

/**
 * 소속 파트너 정보 조회
 * @return { PartnerDto }
 }
 */
const getPartner = async (): Promise<PartnerDto> => {
  const { data } = await axios.get<PartnerDto>("/");
  return plainToInstance(PartnerDto, data);
};

/**
 * 멤버조회
 * @return {results: UserDto[]}
 */
const getMembers = async (): Promise<PartnerMemberDto> => {
  const { data } = await axios.get<PartnerMemberDto>("/user");
  return plainToInstance(PartnerMemberDto, data);
};

/**
 * 프로필조회
 * @return { UserDto }
 */
const getUser = async (): Promise<UserDto> => {
  const { data } = await axios.get<UserDto>("/user/profile");
  return plainToInstance(UserDto, data);
};

/**
 * 프로필수정
 * @payload { UpdateUserPayloadDto }
 */
const updateUser = async (payload: UpdateUserPayloadDto) => {
  await axios.put("/user/profile", payload);
};

/**
 * 카드등록
 * @payload { AddCardPayloadDto }
 */
const addCard = async (payload: AddCardPayloadDto) => {
  await axios.post("/card", payload);
};

export default {
  getUser,
  getPartner,
  getMembers,
  addCard,
  updateUser,
};
