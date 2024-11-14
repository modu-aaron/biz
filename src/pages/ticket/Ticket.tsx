import { useForm, useWatch } from "react-hook-form";
import BaseTitle from "../../components/shared/BaseTitle";
import MainWrapper from "../../components/shared/MainWrapper";
import SelectBox from "../../components/shared/SelectBox";
import { useEffect, useState } from "react";
import { getMonthlyParkingUsers } from "../../services/api/useageStatus";
import ListTable from "../../components/shared/ListTable";
import { MonthlyParkingUsersResDto } from "../../services/api/useageStatus/type";

const Ticket = () => {
  const { control, register, handleSubmit, getValues } = useForm();

  const [data, setData] = useState<MonthlyParkingUsersResDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMonthlyParkingUsers({ offset: 0, limit: 10 });
      setData(response);
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
  ];
  const body = [
    {
      ptSeq: 115,
      carNum: "11가1234",
      carModel: "랜덤3테스트",
      userName: "JEFF",
      extend: { value: "불가", color: "blue" },
    },
    {
      ptSeq: 115,
      carNum: "11가1234",
      carModel: "랜덤3테스트",
      userName: "JEFF",
      extend: "불가",
    },
    {
      ptSeq: 115,
      carNum: "11가1234",
      carModel: "랜덤3테스트",
      userName: "JEFF",
      extend: "불가",
    },
  ];
  return (
    <MainWrapper>
      <BaseTitle text="이용현황" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
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
                className="text-sm border rounded-sm w-full sm:max-w-40 bg-[#0099ff] py-2 text-white"
              >
                검색
              </button>
            </div>
          </div>
        </div>
      </form>
      <ListTable headers={headers} body={body} />
    </MainWrapper>
  );
};

export default Ticket;
