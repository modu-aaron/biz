import axios from "axios";
import {
  onReqError,
  onReqSuccess,
  onResSuccess,
  onResError,
} from "@/services/axios/interceptor";

const config = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/partner`,
};
const instance = axios.create(config);

instance.interceptors.request.use(onReqSuccess, onReqError);
instance.interceptors.response.use(onResSuccess, onResError);

export default instance;
