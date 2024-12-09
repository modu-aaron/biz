import { format } from "date-fns";
import { DateFormat } from "../enums/date";

export const convertToDate = (date: string | Date, formatType: string) => {
  return format(typeof date === "string" ? new Date(date) : date, formatType);
};

export const today = convertToDate(new Date(), DateFormat.DAY_YYYY_MM_DD_DASH);

export const getStatusByCode = <
  T extends { [key: string]: number | string },
  U extends { [key: string]: string }
>(
  code: T[keyof T],
  codeEnum: T,
  statusEnum: U
): string => {
  const statusKey = Object.keys(codeEnum).find((key) => codeEnum[key] === code);

  return statusKey ? statusEnum[statusKey] : "-";
};
