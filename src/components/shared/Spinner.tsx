import { FadeLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="z-20 fixed bg-neutral-500/20 h-full w-full">
      <FadeLoader
        cssOverride={{
          display: "inherit",
          position: "absolute",
          fontSize: "0px",
          top: "50%",
          left: "50%",
          width: "20px",
          height: "20px",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Spinner;
