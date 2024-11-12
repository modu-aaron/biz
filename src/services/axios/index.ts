import axios from "axios";

const config = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/partner`,
};
const instance = axios.create(config);

export default instance;
