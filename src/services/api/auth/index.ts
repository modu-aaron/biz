import axios from "../../axios";
import {
  Menu,
  Partner,
  PartnerCenterPermission,
  PartnerSignInInfo,
  User,
} from "./type";

const signIn = async (payload: {
  email: string;
  password: string;
  pSeq?: number;
}) => {
  const { data } = await axios.post<
    | { accessToken: string; refreshToken: string }
    | { partner: PartnerSignInInfo[] }
  >("/auth/login", payload);
  return data;
};

const getMenus = async () => {
  const { data } = await axios.get<{
    menus: Menu[];
    permissions: PartnerCenterPermission[];
    profile: User;
    partners: Partner[];
  }>("/auth/menu");
  return data;
};

const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { data } = await axios.post<{
    accessToken: string;
    refreshToken: string;
  }>("/auth/refresh", { refreshToken });
  return data;
};

export default {
  refreshAccessToken,
  signIn,
  getMenus,
};
