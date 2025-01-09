import { useSpinner } from "@/store/useSpinner";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export type ServerError = {
  error: {
    code: number;
    message: string;
  };
  tid: string;
  ts: number;
};

export const getIsServerError = (status: number) => {
  return /^5[0-9][0-9]$/.test(String(status));
};

export const getIsUnauthorizedError = (status: number) => {
  return status === 401;
};

export const getIsSuccess = (status: number) => {
  return /^2[0-9][0-9]$/.test(String(status));
};

export const setSpinnerOption = (option: boolean) => {
  const { isSpinnerOpen, setIsSpinner } = useSpinner.getState();
  if (isSpinnerOpen) setIsSpinner(option);
};

export const onServerError = (error: AxiosError<ServerError>) => {
  const statusCode = error.response?.status ?? 0;
  const defaultErrorMessage =
    "일시적인 서버 오류로 서비스가 동작하지 않습니다.\n잠시 후 다시 시도해주세요.";
  const errorMessage =
    error.response?.data.error.message ?? defaultErrorMessage;
  const alertMessage = statusCode.toString().startsWith("4")
    ? errorMessage
    : defaultErrorMessage;

  toast.error(alertMessage);
};
