import bizSmallLogo from "@/assets/images/biz-s-logo.png";
import { DateFormat } from "@/enums";
import { convertToDate } from "@/utils/date";

interface ProfileCardProps {
  name?: string;
  phone?: string;
  role?: string;
  activatedAt?: Date;
}

const ProfileCard = ({ name, phone, role, activatedAt }: ProfileCardProps) => {
  let day;

  if (activatedAt) {
    day = convertToDate(activatedAt, DateFormat.DAY_YYYY_MM_DD_DASH);
  }
  if (phone) {
    phone = phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="relative border w-18 md:w-48 aspect-square rounded-full overflow-hidden">
          <img
            src="https://ca.slack-edge.com/T04GJSZC2-U06DV3V3TL6-f19097d81964-512"
            alt="프로필"
            className="object-cover h-full md:object-fill"
          />
        </div>
        <h1 className="text-xl font-semibold tracking-tight leading-tight py-2">
          {name || "홍길동님"}
        </h1>
        <p className="text-sm font-mono">
          {phone || "휴대폰 번호를 입력해주세요."}
        </p>
        <p className="text-xs font-mono">가입일자: {day}</p>
      </div>
      <div className="mt-auto flex justify-between items-center pt-4">
        <span className="text-[0.8rem] font-medium px-2 py-[3px] rounded-sm">
          {role || "역할을 선택해주세요."}
        </span>
        <img src={bizSmallLogo} className="object-cover w-10 h-10" />
      </div>
    </>
  );
};

export default ProfileCard;
