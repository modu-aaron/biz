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
    "inline-flex items-center px-4 py-2 text-sm rounded-sm font-medium whitespace-nowrap text-white bg-[#0078ff] border border-gray-200 hover:bg-[#0388de] hover:brightness-90";
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
