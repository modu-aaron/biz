import { FaCcVisa } from "react-icons/fa";

interface CardInfoProps {
  cardNumber: string;
  birth: string;
  expiryDate: string;
}

const Card = ({ cardNumber, expiryDate }: CardInfoProps) => {
  return (
    <>
      <div className="relative border w-32 md:w-full aspect-square rounded-md overflow-hidden">
        <img
          src="https://ca.slack-edge.com/T04GJSZC2-U06DV3V3TL6-f19097d81964-512"
          alt="프로필"
          className="object-cover h-full md:object-fill"
        />
      </div>

      <div className="flex flex-col gap-0 mt-4">
        <h1 className="text-xl font-semibold tracking-tight leading-tight">
          {cardNumber || "**** **** **** ****"}
        </h1>
        <p className="text-sm font-mono">{expiryDate || new Date().getDay()}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-[0.6rem] font-medium px-2 py-[3px] rounded-sm">
          SOCAR
        </span>
        <FaCcVisa size={28} className="opacity-70" />
      </div>
    </>
  );
};

export default Card;
