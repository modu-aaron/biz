import { useForm, useWatch } from "react-hook-form";
import BaseTitle from "@/shared/components/BaseTitle";
import SelectBox from "@/shared/components/SelectBox";
import { useEffect, useState } from "react";
import ticketService from "@/services/api/ticket";
import ListTable from "@/shared/components/ListTable";
import {
  MonthlyParkingUsersParamsReqDto,
  MonthlyParkingUsersResDto,
} from "@/services/api/ticket/ticket.dto";
import Pagination from "@/shared/components/Pagination";
import { MonthlyParkingUseStatus, MonthlyParkingUseStatusCode } from "@/enums";
import { getStatusByCode } from "@/utils/common";
import usePagination from "@/hooks/usePagination";

const Ticket = () => {
  const { control, register, handleSubmit, getValues } = useForm();

  const [data, setData] = useState<MonthlyParkingUsersResDto | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const {
    currentPage,
    totalCount,
    limit,
    setLimit,
    setTotalCount,
    handlePageChange,
  } = usePagination(20);

  const getTicketData = async () => {
    const response = await ticketService.getMonthlyParkingUsers({
      offset: currentPage.value,
      limit: limit,
    });
    setTotalCount(response.total);
    setLimit(response.limit);
    setData(response);
  };

  useEffect(() => {
    getTicketData();
  }, [currentPage, limit]);

  const searchKey = useWatch({
    control,
    name: "search.searchKey",
  });

  const formattedSearchOption = () => {
    const key = getValues("search");
    const { searchKey, searchWord, status, remainingDays } = key;
    const params: MonthlyParkingUsersParamsReqDto = {
      offset: currentPage.value,
      limit: limit,
    };
    if (searchKey && searchWord)
      params[searchKey as "carNum" | "ptSeq" | "userPhone"] = searchWord;
    if (status) params.status = status;
    if (remainingDays) params.remainingDays = remainingDays;
    return params;
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const allIds = data?.results.map((user) => user.ptSeq) || [];
      setSelectedRows(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows]);

  const handleRowSelect = (ptSeq: number) => {
    setSelectedRows((prev) =>
      prev.includes(ptSeq)
        ? prev.filter((id) => id !== ptSeq)
        : [...prev, ptSeq]
    );
  };

  if (!data) return;

  const onSubmit = async () => {
    const params = formattedSearchOption();
    const data = await ticketService.getMonthlyParkingUsers({
      ...params,
    });
    setData(data);
    setTotalCount(data.total);
    setLimit(data.limit);
  };

  const generateTableBody = () => {
    if (!data) return [];
    const result = data.results.map((user, index) => ({
      checkbox: {
        value: selectedRows.includes(user.ptSeq),
        type: "checkbox",
        onChange: () => handleRowSelect(user.ptSeq),
      },
      ptSeq: { value: user.ptSeq, type: "string" },
      carNum: { value: user.carNum, type: "string" },
      carModel: { value: user.carModel, type: "string" },
      parkingLotName: {
        value: user.partnerTicketProduct.parkinglot.name,
        type: "string",
      },
      partnerTicketName: {
        value: user.partnerTicketProduct.name,
        type: "string",
      },
      useStartDate: { value: user.useStartDate, type: "string" },
      useEndDate: { value: user.useEndDate, type: "string" },
      userName: { value: user.userName, type: "string" },
      userPhone: { value: user.userPhone, type: "string" },
      creator: { value: user.creator.name, type: "string" },
      status: {
        value: getStatusByCode(
          user.status,
          MonthlyParkingUseStatusCode,
          MonthlyParkingUseStatus
        ),
        type: "string",
      },
      remainingDays: { value: `${user.remainingDays}일`, type: "string" },
      extend: {
        value: user.extend.isAble ? "가능" : "불가",
        type: "string",
        className: user.extend.isAble ? "text-[#0078ff]" : "text-red-500",
      },
      isAutoExtend: {
        value: user.isAutoExtend ? "true" : "false",
        type: "dropdown",
        options: [
          { value: "true", name: "Y" },
          { value: "false", name: "N" },
        ],
        onChange: (e) => handleExtendDropdownChange(index, e),
      },
    }));
    return result;
  };

  const handleExtendDropdownChange = async (
    index: number,
    newValue: string
  ) => {
    const isOk = window.confirm("자동연장을 변경하시겠습니까?");
    if (!isOk) return;
    await ticketService.updateAutoExtendStatus(data.results[index].ptSeq, {
      isAutoExtend: newValue === "true",
    });
    await getTicketData();
  };

  const tableBody = generateTableBody();

  const headers = [
    { value: "checkbox", checked: isAllSelected, onChange: handleSelectAll },
    { value: "ptSeq", name: "주차권 번호" },
    { value: "carNum", name: "차량번호" },
    { value: "carModel", name: "차 모델명" },
    { value: "parkingLotName", name: "주차장명" },
    { value: "partnerTicketName", name: "주차권명" },
    { value: "useStartDate", name: "이용시작일" },
    { value: "useEndDate", name: "이용종료일" },
    { value: "userName", name: "사용자명" },
    { value: "userPhone", name: "사용자 연락처" },
    { value: "creator", name: "담당자" },
    { value: "status", name: "주차권 이용상태" },
    { value: "remainingDays", name: "잔여일" },
    { value: "extend", name: "연장" },
    { value: "isAutoExtend", name: "자동연장" },
  ];

  return (
    <>
      <BaseTitle text="이용현황" />
      <div className="flex flex-col gap-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="w-full border border-neutral-200/50 rounded px-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-10">
                <p className="text-sm whitespace-nowrap">검색어</p>
                <div className="flex gap-2 w-full">
                  <SelectBox
                    name="search.searchKey"
                    label={null}
                    control={control}
                    options={[
                      { value: null, label: "선택" },
                      { value: "carNum", label: "차량번호" },
                      { value: "ptSeq", label: "주차권번호" },
                      { value: "userPhone", label: "사용자 연락처" },
                    ]}
                  />
                  <input
                    type="text"
                    disabled={!searchKey || searchKey === "선택"}
                    {...register("search.searchWord")}
                    placeholder="검색어를 입력해주세요."
                    className="pl-2 py-2 w-full sm:max-w-64 text-sm rounded-sm border border-neutral-300/50"
                  />
                </div>
              </div>
              <hr className="border-neutral-200/40 " />
              <p className="text-sm">상세조건</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <SelectBox
                  name="search.status"
                  label={"이용상태"}
                  control={control}
                  options={[
                    { value: null, label: "전체" },
                    { value: 200, label: "사용중" },
                  ]}
                />
                <SelectBox
                  name="search.remainingDays"
                  label={"잔여일"}
                  control={control}
                  options={[
                    { value: null, label: "전체" },
                    { value: 1, label: "1일 (오늘 종료)" },
                    { value: 3, label: "3일 이내" },
                    { value: 7, label: "7일 이내" },
                    { value: 14, label: "14일 이내" },
                  ]}
                />
              </div>
              <div className="flex w-full items-center justify-center ">
                <button
                  type="submit"
                  className="text-sm border rounded-sm w-full sm:max-w-40 bg-[#0078ff] py-2 text-white"
                >
                  검색
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="w-full flex justify-end">
          <button className="px-2 py-1 text-[12px] sm:px-3 sm:py-2 rounded-sm sm:text-sm border">
            선택건 연장결제
          </button>
        </div>
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

export default Ticket;
