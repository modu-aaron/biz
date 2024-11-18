import { useForm, useWatch } from "react-hook-form";
import BaseTitle from "../../components/shared/BaseTitle";
import MainWrapper from "../../components/shared/MainWrapper";
import SelectBox from "../../components/shared/SelectBox";
import { useEffect, useState } from "react";
import { getMonthlyParkingUsers } from "../../services/api/useageStatus";
import ListTable from "../../components/shared/ListTable";
import { MonthlyParkingUsersResDto } from "../../services/api/useageStatus/type";
import { text } from "stream/consumers";
import Pagination from "../../components/shared/Pagination";

const Ticket = () => {
  const { control, register, handleSubmit, getValues } = useForm();

  const [testValues, setTestValues] = useState<string[]>([]);
  const [data, setData] = useState<MonthlyParkingUsersResDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMonthlyParkingUsers({ offset: 0, limit: 20 });
      setData(response);
      if (response?.results) {
        const initialTestValues = response.results.map(
          (user) => user.creator.name || ""
        );
        setTestValues(initialTestValues);
      }
    };

    fetchData();
  }, []);

  const searchKey = useWatch({
    control,
    name: "search.searchKey",
  });

  const onSubmit = () => {
    const values = getValues("search");
    console.log(values);
    // const payload = {
    //   searchKey: data.searchKey,
    //   searchWord: data.searchWord,
    //   usageStatus: data.usageStatus,
    //   remainingDays: data.remainingDays,
    // };
    // console.log("Payload:", payload);
    // 여기에서 API 요청 또는 다른 데이터 처리 로직을 추가할 수 있습니다.
  };

  const handleTestValueChange = (index: number, newValue: string) => {
    setTestValues((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };

  const [currentPage, setCurrentPage] = useState({ value: 0, name: "1" });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generateTableBody = () => {
    if (!data) return [];
    const result = data.results.map((user, index) => ({
      ptSeq: { value: user.ptSeq, type: "link" },
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
      status: { value: user.status, type: "string" },
      remainingDays: { value: user.remainingDays, type: "string" },
      extend: { value: user.extend.isAble ? "가능" : "불가능", type: "string" },
      isAutoExtend: { value: user.isAutoExtend, type: "string" },
      test: {
        value: testValues[index],
        type: "input",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleTestValueChange(index, e.target.value),
      },
    }));

    return result;
  };

  generateTableBody();

  const headers = [
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
    { value: "test", name: "테스트" },
  ];

  return (
    <MainWrapper>
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
        <ListTable headers={headers} body={generateTableBody()} />
        <Pagination
          currPage={currentPage}
          totalCount={48}
          limit={20}
          onPageChange={handlePageChange}
        />
        <p>
          현재 페이지: {currentPage.name} (Value: {currentPage.value})
        </p>
      </div>
    </MainWrapper>
  );
};

export default Ticket;
