import { useState } from "react";
import TicketIcon from "../../assets/TicketIcon";
import PartnerIcon from "../../assets/PartnerIcon";
import CashIcon from "../../assets/CashIcon";

const DropDownItem = ({ item }) => {
  return (
    <>
      <a
        href={item.content}
        className="text-[#333333] px-5 py-3 w-[110px] text-center whitespace-nowrap"
      >
        {item.title}
      </a>
    </>
  );
};

export const DropDown = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const svgIcons = [<TicketIcon />, <CashIcon />, <PartnerIcon />];

  return (
    <ul className="py-2 text-sm text-[#333333]">
      {data.map((menuItem, index) => (
        <li
          key={index}
          className="mb-4 last:mb-0 relative w-full text-[#797575]"
        >
          <p
            className="font-medium cursor-pointer flex items-center space-x-2"
            onClick={() => toggleDropdown(index)}
          >
            <span>{svgIcons[index % svgIcons.length]}</span>
          </p>
          <ul
            className={`overflow-hidden absolute right-[-125px] top-0 z-1 flex flex-col bg-neutral-50 border border-neutral-200 rounded-md ${
              activeIndex === index ? "slide-in" : "slide-out"
            }`}
          >
            {activeIndex === index &&
              menuItem.content.map((item, idx) => (
                <DropDownItem key={idx} item={item} />
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
