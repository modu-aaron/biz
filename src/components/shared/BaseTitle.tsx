interface BaseTitleProps {
  text: string;
}

const BaseTitle = ({ text }: BaseTitleProps) => {
  return (
    <h1 className="py-3 text-left w-full font-semibold text-base sm:text-lg md:text-xl">
      {text}
    </h1>
  );
};

export default BaseTitle;
