const BaseTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="py-3 text-left w-full font-semibold text-lg md:text-xl">
      {text}
    </h1>
  );
};

export default BaseTitle;
