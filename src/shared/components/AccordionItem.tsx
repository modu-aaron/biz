import { Menu } from "@/services/api/auth/type";
import { useLocation } from "react-router-dom";

interface AccordionItemProps {
  title: string;
  children?: Menu[];
  isOpen: boolean;
  toggleAccordion: () => void;
}

const AccordionItem = ({
  title,
  children,
  isOpen,
  toggleAccordion,
}: AccordionItemProps) => {
  const location = useLocation();
  return (
    <div
      className={`${!isOpen && "border-b"} ${
        title === "파트너" && "border-none"
      } border-slate-200 w-full`}
    >
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center py-3 text-slate-800"
      >
        <span>{title}</span>
        <span className="text-slate-800 transition-transform duration-300">
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-linear ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="pb-5 text-sm text-slate-500">
          {children?.map((item, index) => (
            <div className="py-2" key={index}>
              <a
                className={`${
                  location.pathname === item.uri ? "text-[#0078ff]" : ""
                }`}
                href={item.uri ? item.uri : ""}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
