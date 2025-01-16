import {
  getIsServerError,
  getIsSuccess,
  getIsUnauthorizedError,
  onServerError,
  ServerError,
} from "@/shared/errors";
import { useAuth } from "@/store/useAuth";
import { useSpinner } from "@/store/useSpinner";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import instance from ".";

const setSpinnerOption = (option: boolean) => {
  const { setIsSpinner } = useSpinner.getState();
  setIsSpinner(option);
};

export const onReqSuccess = (config: InternalAxiosRequestConfig) => {
  setSpinnerOption(true);
  const { accessToken } = useAuth.getState();
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

export const onReqError = (error: Error | AxiosError) => {
  setSpinnerOption(false);
  return Promise.reject(error);
};

export const onResSuccess = (response: AxiosResponse) => {
  setSpinnerOption(false);
  return {
    ...response.data,
    status: response.status,
  };
};

export const onResError = async (error: AxiosError<ServerError>) => {
  setSpinnerOption(false);
  if (error && error.response) {
    const { refreshToken, refreshAccessToken, signOut } = useAuth.getState();
    const { data, status } = error.response;
    const isServerError = getIsServerError(status);
    const isUnauthorizedError = getIsUnauthorizedError(status);
    const isSuccess = getIsSuccess(status);
    const isLoginError = error.response.config.url === "/auth/login";
    const isRefreshTokenError = error.response.config.url === "/auth/refresh";

    if (isServerError) onServerError(error);

    if (
      !isServerError &&
      !isSuccess &&
      !(isLoginError && !isUnauthorizedError)
    ) {
      toast.error(data.error.message);
    }

    if (isUnauthorizedError && !isRefreshTokenError && !isLoginError) {
      if (refreshToken) {
        try {
          await refreshAccessToken(refreshToken);
          return instance(error.config as InternalAxiosRequestConfig);
        } catch (e: unknown) {
          signOut();
          window.location.href = "/signIn";
        }
      }
      signOut();
    } else if (isUnauthorizedError && isRefreshTokenError) {
      toast.error(data.error.message);
      signOut();
      window.location.href = "/signIn";
    }
  }

  return Promise.reject(error);
};
