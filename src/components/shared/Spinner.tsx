import { PuffLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="fixed z-50 bg-neutral-500/20 h-full w-full">
      <PuffLoader
        color="#357dd0"
        cssOverride={{
          display: "inherit",
          position: "absolute",
          fontSize: "0px",
          top: "50%",
          left: "50%",
          width: "10px",
          height: "10px",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Spinner;
