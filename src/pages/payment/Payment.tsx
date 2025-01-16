import BaseTitle from "@/shared/components/BaseTitle";
import { useParams } from "react-router-dom";
import ListTable from "@/shared/components/ListTable";
import usePaymentDetail from "@/hooks/usePayment";
import Table from "@/utils/generateTable";

const Payments = () => {
  const { id } = useParams();
  const data = usePaymentDetail(id || "");

  const paymentDetailHeaders = [
    { value: "poSeq", name: "결제번호" },
    { value: "partnerName", name: "결제그룹" },
    { value: "totalPrice", name: "결제금액" },
    { value: "cancelPrice", name: "결제취소금액" },
    { value: "paymentMethod", name: "결제수단" },
    { value: "status", name: "결제상태" },
    { value: "paidAt", name: "결제승인일시" },
  ];

  const orderDetailTableHeader = [
    { value: "ptrSeq", name: "신청번호" },
    { value: "ptSeq", name: "주차권 번호" },
    { value: "type", name: "상품유형" },
    { value: "isExtend", name: "상세" },
    { value: "carNum", name: "차량번호" },
    { value: "carModel", name: "차 모델명" },
    { value: "parkingLotName", name: "주차장명" },
    { value: "ticketName", name: "주차권명" },
    { value: "useStartDate", name: "이용시작일" },
    { value: "useEndDate", name: "이용종료일" },
    { value: "price", name: "결제금액" },
    { value: "creatorName", name: "담당 멤버" },
  ];

  const paymentDetailTableBody =
    Table.payment.generatePaymentDetailTableBody(data);
  const orderDetailTableBody = Table.payment.generateOrderItemTableBody(data);

  return (
    <>
      <BaseTitle text="결제상세" />
      <div className="flex flex-col gap-6">
        <div className="px-6 py-3 border border-gray-100">
          <h2 className="text-lg font-semibold mb-2">결제 정보</h2>
          <ListTable
            headers={paymentDetailHeaders}
            body={paymentDetailTableBody}
          />
        </div>
        <div className="px-6 py-3 border border-gray-100">
          <h2 className="text-lg font-semibold mb-2">구매 주차권 상세내역</h2>
          <ListTable
            headers={orderDetailTableHeader}
            body={orderDetailTableBody}
          />
        </div>
      </div>
    </>
  );
};

export default Payments;
