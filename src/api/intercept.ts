import { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

export const onSettlementReqSuccess = (config: InternalAxiosRequestConfig) => {
  return config;
};

export const onSettlementReqError = (error: AxiosError) => {
  return Promise.reject(error);
};

export const onSettlementResSuccess = (res: AxiosResponse) => {
  return { ...res.data, status: res.status };
};

export const onSettlementResError = (error: AxiosError) => {
  return Promise.reject(error);
};

export const onBizReqSuccess = (config: InternalAxiosRequestConfig) => {
  return config;
};

export const onBizReqError = (error: AxiosError) => {
  return Promise.reject(error);
};

export const onBizResSuccess = (res: AxiosResponse) => {
  return { ...res.data, status: res.status };
};

export const onBizResError = (error: AxiosError) => {
  return Promise.reject(error);
};
