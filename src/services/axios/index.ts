import axios from "axios";
import { useAuth } from "../../store/useAuth";
import { useSpinner } from "../../store/useSpinner";

const setSpinnerOption = (option: boolean) => {
  const { setIsSpinner } = useSpinner.getState();
  setIsSpinner(option);
};
const config = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/partner`,
};
const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    setSpinnerOption(true);
    const { accessToken } = useAuth.getState();
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
    const { response } = error;

    if (response && response.status === 401) {
      const { signOut } = useAuth.getState();
      signOut();
    }

    return Promise.reject(error);
  }
);
export default instance;
