import { ko } from "date-fns/locale";
import { MdOutlineCalendarToday } from "react-icons/md";
import { useEffect, useState } from "react";
import BaseTitle from "@/shared/components/BaseTitle";
import Pagination from "@/shared/components/Pagination";
import ButtonGroup from "@/shared/components/ButtonGroup";
import {
  DateFormat,
  PaymentMethod,
  PaymentMethodCode,
  PaymentStatus,
  PaymentStatusCode,
} from "@/enums";
import { subDays, subMonths, format } from "date-fns";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { PaymentsListDto } from "@/services/api/payment/payment.dto";
import paymentService from "@/services/api/payment/index";
import ListTable from "@/shared/components/ListTable";
import { convertToDate } from "@/utils/date";
import { getStatusByCode } from "@/utils/common";
import usePagination from "@/hooks/usePagination";

const Payments = () => {
  const { handleSubmit } = useForm();

  const [data, setData] = useState<PaymentsListDto | null>(null);
  const [date, setDate] = useState(["", ""]);

  const {
    currentPage,
    totalCount,
    limit,
    setLimit,
    handlePageChange,
    setTotalCount,
  } = usePagination(20);

  useEffect(() => {
    const fetchData = async () => {
      const response = await paymentService.getPayments({
        offset: currentPage.value,
        limit: limit,
      });
      setData(response);
      setTotalCount(response.total);
      if (response.limit) {
        setLimit(response.limit);
      }
    };

    fetchData();
  }, [currentPage]);

  const formattedSearchOption = () => ({
    offset: currentPage.value,
    limit,
    ...(date[0] && date[1] ? { from: date[0], to: date[1] } : {}),
  });

  const onSubmit = async () => {
    const params = formattedSearchOption();
    const data = await paymentService.getPayments({
      ...params,
    });
    setData(data);
    if (data.limit) setLimit(data.limit);
    setTotalCount(data.total);
  };

  const generateTableBody = () => {
    if (!data) return [];

    const result = data.results.map((data, s) => ({
      poSeq: {
        value: data.poSeq,
        type: "link",
        link: `/payment/${data.poSeq}`,
      },
      orderItemCount: {
        value: `${data.orderItemCount}매`,
        type: "number",
      },
      totalPrice: {
        value: `${data.totalPrice.toLocaleString()}원`,
        type: "string",
      },
      method: {
        value: getStatusByCode(
          data.payment.method,
          PaymentMethodCode,
          PaymentMethod
        ),
        type: "string",
      },
      paidAt: {
        value:
          convertToDate(data.payment.paidAt, DateFormat.DAY_YYYY_MM_DD_DASH) ||
          "-",
        type: "string",
      },
      status: {
        value: getStatusByCode(
          data.payment.status,
          PaymentStatusCode,
          PaymentStatus
        ),
        type: "string",
      },
      receipt: {
        value: "영수증 보기",
        type: "button",
        onClick: () => {
          window.open(data.payment.receipt, "_blank", "width=800,height=1080");
        },
      },
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
    const [start, end] = getSearchRange(value);
    setDate([start, end]);
  };

  const getSearchRange = (searchRange: number | null) => {
    let to = format(new Date(), DateFormat.DAY_YYYY_MM_DD_DASH); // 오늘
    let from = "";

    switch (searchRange) {
      case null: // 전체 기간
        from = "";
        to = "";
        break;
      case 1:
        from = to;
        break;
      case 7:
        from = format(subDays(new Date(), 6), DateFormat.DAY_YYYY_MM_DD_DASH);
        break;
      case 30:
        from = format(subMonths(new Date(), 1), DateFormat.DAY_YYYY_MM_DD_DASH);
        break;
      case 90:
        from = format(subMonths(new Date(), 3), DateFormat.DAY_YYYY_MM_DD_DASH);
        break;
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
    <>
      <BaseTitle text="결제이력" />
      <div className="flex flex-col gap-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="w-full border border-neutral-200/50 rounded px-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-10">
                <p className="hidden md:block text-sm whitespace-nowrap">
                  조회기간
                </p>
                <div className="flex flex-col gap-2 w-full justify-center md:flex-row sm:justify-normal">
                  <ButtonGroup buttons={buttons} />
                  <div className="flex items-center justify-center border rounded-sm">
                    <DatePicker
                      selectsRange
                      startDate={date[0] ? new Date(date[0]) : undefined}
                      endDate={date[1] ? new Date(date[1]) : undefined}
                      onChange={(update) => {
                        const [start, end] = update;
                        setDate([
                          start
                            ? format(start, DateFormat.DAY_YYYY_MM_DD_DASH)
                            : "",
                          end
                            ? format(end, DateFormat.DAY_YYYY_MM_DD_DASH)
                            : "",
                        ]);
                      }}
                      showIcon={true}
                      icon={<MdOutlineCalendarToday />}
                      locale={ko}
                      placeholderText="날짜를 선택해주세요."
                      dateFormat={DateFormat.DAY_YYYY_MM_DD_DASH}
                      disabledKeyboardNavigation
                    />
                  </div>
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

export default Payments;
