import axios from "../../axios/index";
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
  const { data } = await axios.post<{
    accessToken: string;
    refreshToken: string;
  }>("/auth/login", payload);
  return data;
};

const getMenus = async (token: string) => {
  const { data } = await axios.get<{
    menus: Menu[];
    permissions: PartnerCenterPermission[];
    profile: User;
    partners: Partner[];
  }>("/auth/menu", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
