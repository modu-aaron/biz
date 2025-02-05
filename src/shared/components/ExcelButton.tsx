import { RequestExcelStatusPayload } from "@/services/api/payment/payment.dto";

interface ExcelButtonProps {
  text: string;
  onClick: (payload: RequestExcelStatusPayload["reason"]) => Promise<void>;
  payload: RequestExcelStatusPayload["reason"];
  additionalClasses?: string;
}

const ExcelButton = ({
  text,
  onClick,
  additionalClasses,
  payload,
}: ExcelButtonProps) => {
  const baseClasses =
    "inline-flex items-center px-4 py-2 text-sm rounded-sm font-medium whitespace-nowrap text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700";
  return (
    <button
      type="button"
      className={`${baseClasses} ${additionalClasses}`}
      onClick={() => onClick(payload)}
    >
      {text}
    </button>
  );
};

export default ExcelButton;
