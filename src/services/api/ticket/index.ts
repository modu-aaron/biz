import { plainToInstance } from "class-transformer";
import axios from "@/services/axios";
import {
  MonthlyParkingRequestListsResDto,
  MonthlyParkingUsersResDto,
  MonthlyParkingTicketContractsResDto,
} from "@/services/api/ticket/ticket.dto";

import type {
  MonthlyParkingRequestParamsReqDto,
  MonthlyParkingUsersParamsReqDto,
  MonthlyParkingTicketContractsParamsReqDto,
  CreateMonthlyParkingRequestsBodyReqDto,
  CreateMonthlyParkingExtendRequestsBodyReqDto,
  UpdateAutoExtendStatusBodyReqDto,
  UpdateAutoExtendStatusParamsReq,
} from "@/services/api/ticket/ticket.dto";

/**
 * @description 이용현황 리스트 조회
 * @param {MonthlyParkingUsersParamsReqDto} params MonthlyParkingUsersParamsReqDto
 * @returns {Promise<MonthlyParkingUsersResDto>} MonthlyParkingUsersResDto 타입의 인스턴스
 */
const getMonthlyParkingUsers = async (
  params: MonthlyParkingUsersParamsReqDto
): Promise<MonthlyParkingUsersResDto> => {
  const { data } = await axios.get("/ticket", { params });
  return plainToInstance(MonthlyParkingUsersResDto, data);
};

/**
 * @description 신청목록 리스트 조회
 * @param {MonthlyParkingRequestParamsReqDto} params MonthlyParkingRequestParamsReqDto
 * @returns {Promise<MonthlyParkingRequestListsResDto>} MonthlyParkingRequestListsResDto 타입의 인스턴스
 */
const getMonthlyParkingRequests = async (
  params: MonthlyParkingRequestParamsReqDto
): Promise<MonthlyParkingRequestListsResDto> => {
  const { data } = await axios.get("/ticket-request", { params });
  return plainToInstance(MonthlyParkingRequestListsResDto, data);
};

/**
 * @description 신청목록 생성
 * @param {CreateMonthlyParkingRequestsBodyReqDto} payload CreateMonthlyParkingRequestsBodyReqDto
 * @returns {Promise<void>} void
 */
const makeMonthlyParkingRequests = async (
  payload: CreateMonthlyParkingRequestsBodyReqDto
): Promise<void> => {
  await axios.post("/ticket-request", payload);
};

/**
 * @description 연장신청 생성
 * @param {CreateMonthlyParkingExtendRequestsBodyReqDto} payload CreateMonthlyParkingExtendRequestsBodyReqDto
 * @returns {Promise<void>} void
 */
const makeMonthlyParkingExtendRequests = async (
  payload: CreateMonthlyParkingExtendRequestsBodyReqDto
): Promise<void> => {
  await axios.post("/ticket-request/extend", payload);
};

/**
 * @description 주차장 및 주차권 리스트 조회
 * @param {MonthlyParkingTicketContractsParamsReqDto} params MonthlyParkingTicketContractsParamsReqDto
 * @returns {Promise<MonthlyParkingTicketContractsResDto>} MonthlyParkingTicketContractsResDto
 */
const getTicketContracts = async (
  params: MonthlyParkingTicketContractsParamsReqDto
): Promise<MonthlyParkingTicketContractsResDto> => {
  const { data } = await axios.get("/ticket-contract", { params });
  return plainToInstance(MonthlyParkingTicketContractsResDto, data);
};

/**
 * @description 자동연장 상태 변경
 * @param {UpdateAutoExtendStatusParamsReq['ptSeq']} pathVar ptSeq
 * @param {UpdateAutoExtendStatusBodyReqDto} payload UpdateAutoExtendStatusBodyReqDto
 * @returns {Promise<void>} void
 */
const updateAutoExtendStatus = async (
  pathVar: UpdateAutoExtendStatusParamsReq["ptSeq"],
  payload: UpdateAutoExtendStatusBodyReqDto
): Promise<void> => {
  await axios.put(`/ticket/auto-extend/${pathVar}`, payload);
};

export default {
  getMonthlyParkingUsers,
  getMonthlyParkingRequests,
  getTicketContracts,
  makeMonthlyParkingRequests,
  makeMonthlyParkingExtendRequests,
  updateAutoExtendStatus,
};
