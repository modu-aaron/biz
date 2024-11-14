import axios from "../../axios";
import {
  MonthlyParkingUsersParamsReqDto,
  MonthlyParkingUsersResDto,
} from "./type";

const getMonthlyParkingUsers = async (
  params: MonthlyParkingUsersParamsReqDto
): Promise<MonthlyParkingUsersResDto> => {
  const { data } = await axios.get("/ticket", { params });
  return data;
};

export { getMonthlyParkingUsers };
