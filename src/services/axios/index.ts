import axios from "axios";
import { useAuth } from "../../store/useAuth";
import { useSpinner } from "../../store/useSpinner";

// Spinner 옵션 설정 함수
const setSpinnerOption = (option: boolean) => {
  const { isSpinnerOpen, setIsSpinner } = useSpinner.getState();
  if (isSpinnerOpen) setIsSpinner(option);
};

// Axios 인스턴스 생성
const config = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/partner`,
};
const instance = axios.create(config);

// 요청 성공 인터셉터
instance.interceptors.request.use(
  (config) => {
    setSpinnerOption(true);
    const { accessToken } = useAuth.getState(); // 인터셉터 내부에서 상태 가져오기
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    setSpinnerOption(false);
    return Promise.reject(error);
  }
);

// 응답 성공 인터셉터
instance.interceptors.response.use(
  (response) => {
    setSpinnerOption(false);
    return {
      ...response.data,
      status: response.status,
    };
  },
  (error) => {
    setSpinnerOption(false);
    return Promise.reject(error);
  }
);

export default instance;
