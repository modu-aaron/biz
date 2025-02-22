import { useEffect } from "react";
import { Menu } from "@/services/api/auth/type";
import AccordionItem from "@/shared/components/AccordionItem";
import { useSidebar } from "@/store/useSidebar";

const Accordion = ({ data }: { data: Menu[] }) => {
  const { activeMenu, setIsActiveMenu, setActive } = useSidebar();

  const toggleAccordion = (index: number) => {
    setIsActiveMenu(index, !activeMenu[index]);
  };

  useEffect(() => {
    if (activeMenu) {
      try {
        const states: boolean[] = activeMenu;
        if (Array.isArray(states)) {
          setActive(states);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="w-full bg-white px-5 md:px-0 text-[14px]">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.name}
          children={item.children}
          isOpen={activeMenu[index]}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
