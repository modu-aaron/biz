import { useEffect } from "react";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useSpinner } from "../../store/useSpinner";
import { useAuth } from "../../store/useAuth";

const useAxiosInterceptor = () => {
  const { setIsSpinner } = useSpinner();
  const { accessToken } = useAuth();

  useEffect(() => {
    // 요청 성공 인터셉터
    const onReqSuccess = (config: InternalAxiosRequestConfig) => {
      setIsSpinner(true);
      if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    };

    // 요청 에러 인터셉터
    const onReqError = (error: AxiosError) => {
      setIsSpinner(false);
      return Promise.reject(error);
    };

    // 응답 성공 인터셉터
    const onResSuccess = (response: AxiosResponse) => {
      setIsSpinner(false);
      return {
        ...response.data,
        status: response.status,
      };
    };

    // 응답 에러 인터셉터
    const onResError = (error: AxiosError) => {
      setIsSpinner(false);
      return Promise.reject(error);
    };

    // 인터셉터 설정
    const requestInterceptor = axios.interceptors.request.use(
      onReqSuccess,
      onReqError
    );
    const responseInterceptor = axios.interceptors.response.use(
      onResSuccess,
      onResError
    );

    // 컴포넌트 unmount 시 인터셉터 해제
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsSpinner, accessToken]);
};

export default useAxiosInterceptor;
