import { useEffect, useState } from "react";
import partnerService from "@/services/api/partner/index";
import { PartnerMemberDto } from "@/services/api/partner/partner.dto";
import { convertToDate } from "@/utils/date";
import { DateFormat } from "@/enums";
import MainWrapper from "@/components/shared/MainWrapper";
import ListTable from "@/components/shared/ListTable";
import Pagination from "@/components/shared/Pagination";
import BaseTitle from "@/components/shared/BaseTitle";

const PartnerUser = () => {
  const [data, setData] = useState<PartnerMemberDto | null>(null);
  const [currentPage, setCurrentPage] = useState({ value: 0, name: "1" });
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      const response = await partnerService.getMembers();
      setData(response);
      setTotalCount(response.total);
      if (response.limit) {
        setLimit(response.limit);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generateTableBody = () => {
    if (!data) return [];

    const result = data.results.map((data, _) => ({
      name: {
        value: data.name,
        type: "string",
      },
      phone: {
        value: `${data.phone}`,
        type: "string",
      },
      roleName: {
        value: data.roleName,
        type: "string",
      },
      status: {
        value: data.status,
        type: "string",
      },
      activatedAt: {
        value: convertToDate(data.activatedAt, DateFormat.DAY_YYYY_MM_DD_DASH),
        type: "string",
      },
    }));

    return result;
  };

  const tableBody = generateTableBody();

  const headers = [
    { value: "name", name: "이름" },
    { value: "phone", name: "휴대폰번호" },
    { value: "roleName", name: "역할" },
    { value: "status", name: "상태" },
    { value: "activatedAt", name: "파트너 가입일" },
  ];

  return (
    <MainWrapper>
      <BaseTitle text="멤버목록" />
      <div className="sm:p-8 md:p-16">
        <ListTable headers={headers} body={tableBody} />
        <Pagination
          currPage={currentPage}
          totalCount={totalCount}
          limit={limit}
          onPageChange={handlePageChange}
        />
      </div>
    </MainWrapper>
  );
};

export default PartnerUser;
