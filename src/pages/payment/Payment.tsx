import { useForm, useWatch } from "react-hook-form";
import BaseTitle from "../../components/shared/BaseTitle";
import MainWrapper from "../../components/shared/MainWrapper";
import { useEffect, useState } from "react";
import ListTable from "../../components/shared/ListTable";
import Pagination from "../../components/shared/Pagination";
import { useAuth } from "../../store/useAuth";
import {
  MonthlyParkingRequestListsResDto,
  MonthlyParkingRequestParamsReqDto,
} from "../../services/api/ticketRequest/type";
import { getMonthlyParkingRequests } from "../../services/api/ticketRequest";
import ButtonGroup from "../../components/shared/ButtonGroup";
import { convertToDate, today } from "../../utils/date";
import { DateFormat } from "../../enums/date";
import { addDays, format, subDays, subMonths } from "date-fns";
import DatePicker from "react-datepicker";

const Payment = () => {
  const { control, register, handleSubmit, getValues } = useForm();
  const { user } = useAuth();

  const [data, setData] = useState<MonthlyParkingRequestListsResDto | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState({ value: 0, name: "1" });
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(20);
  const [date, setDate] = useState(["", ""]);

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
        value: data.type,
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
      createdAt: { value: data.createdAt, type: "string" },
      creator: {
        value: data.partnerTicket.creator.name,
        type: "string",
      },
      status: { value: data.status, type: "string" },
    }));
    return result;
  };

  const tableBody = generateTableBody();

  const headers = [
    { value: "poSeq", name: "결제번호" },
    { value: "orderItemCount", name: "수량" },
    { value: "totalPrice", name: "결제금액" },
    { value: "method", name: "결제수단" },
    { value: "paidAt", name: "결제승인일시" },
    { value: "status", name: "결제상태" },
    { value: "receipt", name: "영수증 보기" },
  ];

  const handleClick = (value: number | null) => {
    setDate(getSearchRange(value));
  };

  const getSearchRange = (searchRange) => {
    let to = today;
    let from = today;
    switch (searchRange) {
      case null:
        from = "";
        to = "";
        break;
      case 7:
        from = format(subDays(new Date(), 6), DateFormat.DAY_YYYY_MM_DD_DASH);
        break;
      case 30:
        from = format(
          addDays(subMonths(new Date(), 1), 1),
          DateFormat.DAY_YYYY_MM_DD_DASH
        );
        break;
      case 90:
        from = format(
          addDays(subMonths(new Date(), 3), 1),
          DateFormat.DAY_YYYY_MM_DD_DASH
        );
    }
    return [from, to];
  };

  const buttons = [
    {
      text: "전체",
      value: null,
      onClick: () => handleClick(null),
      isActive: false,
    },
    { text: "오늘", value: 1, onClick: () => handleClick(1), isActive: false },
    { text: "1주일", value: 7, onClick: () => handleClick(7), isActive: false },
    {
      text: "1개월",
      value: 30,
      onClick: () => handleClick(30),
      isActive: false,
    },
    {
      text: "3개월",
      value: 90,
      onClick: () => handleClick(90),
      isActive: false,
    },
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
                <p className="text-sm whitespace-nowrap">조회기간</p>
                <div className="flex gap-2 w-full justify-center sm:justify-normal">
                  <ButtonGroup buttons={buttons} />
                  <DatePicker
                    selected={new Date()}
                    onChange={(date) => {
                      console.log(date);
                    }}
                    // startDate={}
                    // endDate={}
                    dateFormat={DateFormat.DAY_YYYY_MM_DD_DASH}
                    isClearable
                  />
                  {/* <DatePicker
                    dateFormat={DateFormat.DAY_YYYY_MM_DD_DASH}
                    selected={new Date(date[0])}
                    // onChange={(date) => {
                    //   setDate([
                    //     format(date as Date, DateFormat.DAY_YYYY_MM_DD_DASH),
                    //     date[1],
                    //   ]);
                    // }}
                  /> */}
                  {/* <SelectBox
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
                  /> */}
                </div>
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

        {/* <ListTable headers={headers} body={tableBody} /> */}
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

export default Payment;
