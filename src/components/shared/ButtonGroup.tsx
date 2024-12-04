import { useState } from "react";
import Button from "./Button";

const ButtonGroup = ({ buttons }) => {
  const [activeValue, setActiveValue] = useState(null); // 활성 상태를 관리하는 state

  const handleClick = (value) => {
    setActiveValue(value);
  };

  return (
    <div className="inline-flex rounded-sm shadow-sm" role="group">
      {buttons.map((button, index) => {
        const isFirst = index === 0;
        const isLast = index === buttons.length - 1;
        const isActive = activeValue === button.value;

        const additionalClasses = `
          ${isFirst ? "rounded-s-lg" : ""}
          ${isLast ? "rounded-e-lg" : "border-t border-b"}
          ${isActive ? "bg-blue-500 text-white" : "bg-white text-gray-800"}
        `;

        return (
          <Button
            key={index}
            text={button.text}
            onClick={() => handleClick(button.value)}
            isRounded={false}
            additionalClasses={additionalClasses.trim()}
          />
        );
      })}
    </div>
  );
};

export default ButtonGroup;
