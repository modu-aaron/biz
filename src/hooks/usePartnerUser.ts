import { PartnerMemberDto } from "@/services/api/partner/partner.dto";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import partnerService from "@/services/api/partner/index";

interface UsePartnerUserProps {
  setLimit: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
}

const usePartnerUser = ({ setLimit, setTotalCount }: UsePartnerUserProps) => {
  const [data, setData] = useState<PartnerMemberDto | null>(null);

  const fetchData = async () => {
    const response = await partnerService.getMembers();
    setData(response);
    setTotalCount(response.total);
    setLimit(response.limit);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export default usePartnerUser;
