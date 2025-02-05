import axios from "@/services/axios";

const getExcelStatus = async (params: { id: string }) => {
  const { data } = await axios.get("excel/status", { params });
  return data;
};

export default { getExcelStatus };
