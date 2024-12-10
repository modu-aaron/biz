import { useForm, useWatch } from "react-hook-form";
import BaseTitle from "@/components/shared/BaseTitle";
import MainWrapper from "@/components/shared/MainWrapper";
import SelectBox from "@/components/shared/SelectBox";
import { useEffect, useState } from "react";
import ListTable from "@/components/shared/ListTable";
import Pagination from "@/components/shared/Pagination";
import { useAuth } from "@/store/useAuth";
import {
  MonthlyParkingRequestListsResDto,
  MonthlyParkingRequestParamsReqDto,
} from "@/services/api/ticketRequest/type";
import { getMonthlyParkingRequests } from "@/services/api/ticketRequest";
import { getStatusByCode, convertToDate } from "@/utils/date";
import {
  MonthlyParkingRequestTypeCode,
  MonthlyParkingRequestType,
  MonthlyParkingRequestStatusCode,
  MonthlyParkingRequestStatus,
  DateFormat,
} from "@/enums";

const TicketRequest = () => {
  const { control, register, handleSubmit, getValues } = useForm();
  const { user } = useAuth();

  const [data, setData] = useState<MonthlyParkingRequestListsResDto | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState({ value: 0, name: "1" });
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMonthlyParkingRequests({
        offset: currentPage.value,
        limit: limit,
      });
      setTotalCount(response.total);
      setLimit(response.limit);
      setData(response);
    };

    fetchData();
  }, [currentPage, limit]);

  const searchKey = useWatch({
    control,
    name: "search.searchKey",
  });

  const formattedSearchOption = () => {
    const key = getValues("search");
    const { searchKey, searchWord, status, puSeq } = key;
    const params: MonthlyParkingRequestParamsReqDto = {
      offset: currentPage.value,
      limit: limit,
    };
    if (searchKey && searchWord)
      params[searchKey as "carNum" | "ptSeq" | "userPhone"] = searchWord;
    if (status) params.status = status;
    if (puSeq !== "전체") params.puSeq = puSeq;
    return params;
  };

  const onSubmit = async () => {
    const params = formattedSearchOption();
    const data = await getMonthlyParkingRequests({
      ...params,
    });
    setData(data);
    setTotalCount(data.total);
    setLimit(data.limit);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generateTableBody = () => {
    if (!data) return [];
    const result = data.results.map((data, index) => ({
      type: {
        value: getStatusByCode(
          data.type,
          MonthlyParkingRequestTypeCode,
          MonthlyParkingRequestType
        ),
        type: "string",
      },
      ptSeq: { value: data.ptSeq, type: "string" },
      parkingLotName: {
        value:
          data.partnerTicket.partnerTicketProduct.parkinglot.parkinglotName,
        type: "string",
      },
      partnerTicketName: {
        value: data.partnerTicket.partnerTicketProduct.name,
        type: "string",
      },
      userName: {
        value: data.userName,
        type: "string",
      },
      userPhone: {
        value: data.userPhone,
        type: "string",
      },
      carNum: { value: data.carNum, type: "string" },
      carModel: { value: data.carModel, type: "string" },
      useStartDate: { value: data.useStartDate, type: "string" },
      useEndDate: { value: data.useEndDate, type: "string" },
      createdAt: {
        value: convertToDate(data.createdAt, DateFormat.DAY_YYYY_MM_DD_DASH),
        type: "string",
      },
      creator: {
        value: data.partnerTicket.creator.name,
        type: "string",
      },
      status: {
        value: getStatusByCode(
          data.status,
          MonthlyParkingRequestStatusCode,
          MonthlyParkingRequestStatus
        ),
        type: "string",
      },
    }));
    return result;
  };

  const tableBody = generateTableBody();

  const headers = [
    { value: "type", name: "유형" },
    { value: "ptSeq", name: "주차권 번호" },
    { value: "parkingLotName", name: "주차장명" },
    { value: "partnerTicketName", name: "주차권명" },
    { value: "userName", name: "사용자명" },
    { value: "userPhone", name: "사용자 연락처" },
    { value: "carNum", name: "차량번호" },
    { value: "carModel", name: "차 모델명" },
    { value: "useStartDate", name: "이용시작일" },
    { value: "useEndDate", name: "이용종료일" },
    { value: "createdAt", name: "신청일" },
    { value: "creator", name: "담당자" },
    { value: "status", name: "진행단계" },
  ];

  const monthlyParkingRequestStatuses = [
    { value: null, label: "전체" },
    { value: 100, label: "대기" },
    { value: 150, label: "접수중" },
    { value: 160, label: "현장접수" },
    { value: 200, label: "승인" },
    { value: 210, label: "반려" },
    { value: 220, label: "이용취소" },
  ];

  return (
    <MainWrapper>
      <BaseTitle text="신청목록" />
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
                  label={"진행단계"}
                  control={control}
                  options={monthlyParkingRequestStatuses}
                />
                <SelectBox
                  name="search.puSeq"
                  label={"내 담당만 보기"}
                  control={control}
                  options={[
                    { value: null, label: "전체" },
                    { value: user?.puSeq || null, label: "내 담당만 보기" },
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

export default TicketRequest;
