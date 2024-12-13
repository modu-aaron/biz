import { Menu } from "@/services/api/auth/type";
import { useState } from "react";
import {
  IoTicketOutline,
  IoPeopleOutline,
  IoFileTrayFullOutline,
} from "react-icons/io5";

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

export const DropDown = ({ data }: { data: Menu[] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const svgIcons = [
    <IoTicketOutline size={32} color="#333333" />,
    <IoFileTrayFullOutline size={32} color="#333333" />,
    <IoPeopleOutline size={32} color="#333333" />,
  ];

  return (
    <ul className="py-2 text-sm text-[#333333]">
      {data.map((menuItem, index) => (
        <li
          key={index}
          className="mb-4 last:mb-0 relative w-full text-[#797575]"
        >
          <p
            className="font-medium cursor-pointer flex items-center justify-center space-x-2"
            onClick={() => toggleDropdown(index)}
          >
            <span>{svgIcons[index % svgIcons.length]}</span>
          </p>
          <ul
            className={`overflow-hidden absolute right-[-125px] top-0 z-1 flex flex-col bg-neutral-50 border border-neutral-200 rounded-md ${
              activeIndex === index ? "slide-in" : "slide-out"
            }`}
          >
            {activeIndex === index && (
              <DropDownItem children={menuItem.children} />
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
