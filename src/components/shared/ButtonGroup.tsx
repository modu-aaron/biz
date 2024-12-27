import Button from "@/components/shared/Button";

interface ButtonProps {
  text: string;
  value: number | null;
  onClick: () => void;
  isActive: boolean;
}

const ButtonGroup = ({ buttons }: { buttons: ButtonProps[] }) => {
  return (
    <div className="inline-flex rounded-sm shadow-sm" role="group">
      {buttons.map((button, index) => {
        const isFirst = index === 0;
        const isLast = index === buttons.length - 1;
        const additionalClasses = `
          ${isFirst ? "rounded-s-lg" : ""}
          ${isLast ? "rounded-e-lg" : "border-t border-b"}
        `;

        return (
          <Button
            key={index}
            text={button.text}
            onClick={button.onClick}
            isRounded={false}
            additionalClasses={additionalClasses.trim()}
          />
        );
      })}
    </div>
  );
};

export default ButtonGroup;
