import { convertToDate } from "@/utils/date";
import { DateFormat } from "@/enums";
import ListTable from "@/shared/components/ListTable";
import Pagination from "@/shared/components/Pagination";
import BaseTitle from "@/shared/components/BaseTitle";
import usePartnerUser from "@/hooks/usePartnerUser";
import usePagination from "@/hooks/usePagination";
import Error from "../Error";

const PartnerUser = () => {
  const {
    currentPage,
    totalCount,
    limit,
    setLimit,
    handlePageChange,
    setTotalCount,
  } = usePagination(20);

  const data = usePartnerUser({ setLimit, setTotalCount });

  if (!data) return <Error />;

  const generateTableBody = () => {
    const result = data.results.map((data) => ({
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
    <>
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
    </>
  );
};

export default PartnerUser;
