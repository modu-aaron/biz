import { format } from "date-fns";
import { DateFormat } from "../enums/date";

export const convertToDate = (date: string | Date, formatType: string) => {
  return format(typeof date === "string" ? new Date(date) : date, formatType);
};

export const today = convertToDate(new Date(), DateFormat.DAY_YYYY_MM_DD_DASH);
