import { PartnerCenterPermission } from "../enums/auth";

export interface User {
  puSeq: number;
  name: string;
  phone: string;
  roleName: string;
  status: string;
  activatedAt: string;
}

export interface Menu {
  pmSeq: number;
  priority: number;
  name: string;
  uri: string | null;
  children?: Menu[];
}

export interface Partner {
  pSeq: number;
  name: string;
  createdAt: string;
  address: string;
  paymentType: number;
  partnerCard: {
    name: string;
    number: string;
  } | null;
}

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: User | null;
  menus: Menu[];
  partners: Partner[];
  permissions: PartnerCenterPermission[];
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: User) => void;
  setMenus: (menus: Menu[]) => void;
  setPartners: (partners: Partner[]) => void;
  setPermissions: (permissions: PartnerCenterPermission[]) => void;
}
