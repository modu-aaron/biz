import axios from "axios";
import {
  onBizReqError,
  onBizReqSuccess,
  onBizResError,
  onBizResSuccess,
  onSettlementReqError,
  onSettlementReqSuccess,
  onSettlementResSuccess,
} from "./intercept";

const config = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/partner`,
};

const instance = axios.create(config);

if (window.location.pathname === "/settlement") {
  instance.interceptors.request.use(
    onSettlementReqSuccess,
    onSettlementReqError
  );
  instance.interceptors.response.use(
    onSettlementResSuccess,
    onSettlementReqError
  );
} else {
  instance.interceptors.request.use(onBizReqSuccess, onBizReqError);
  instance.interceptors.response.use(onBizResSuccess, onBizResError);
}

export default instance;
