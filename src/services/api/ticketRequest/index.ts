import axios from "../../axios/index";
import {
  MonthlyParkingRequestListsResDto,
  MonthlyParkingRequestParamsReqDto,
} from "./type";

/**
 * @description 신청목록 리스트 조회
 * @param {MonthlyParkingRequestParamsReqDto} params MonthlyParkingRequestParamsReqDto
 * @returns {Promise<MonthlyParkingRequestListsResDto>} MonthlyParkingRequestListsResDto 타입의 인스턴스
 */
const getMonthlyParkingRequests = async (
  params: MonthlyParkingRequestParamsReqDto
): Promise<MonthlyParkingRequestListsResDto> => {
  const { data } = await axios.get("/ticket-request", { params });
  return data;
};

export { getMonthlyParkingRequests };
