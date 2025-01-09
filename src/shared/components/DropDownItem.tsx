import { Menu } from "@/services/api/auth/type";

const DropDownItem = ({ children }: { children: Menu["children"] }) => {
  return (
    <>
      {children?.map((item, index) => (
        <a
          key={index}
          href={item.uri ? item.uri : ""}
          className="text-[#333333] px-5 py-3 w-[110px] text-center whitespace-nowrap"
        >
          {item.name}
        </a>
      ))}
    </>
  );
};

export default DropDownItem;
