import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/shared/components/layout/Sidebar";
import Spinner from "@/shared/components/Spinner";
import { useSpinner } from "@/store/useSpinner";

const MainWrapper = ({ children }: { children: ReactNode }) => {
  const { isSpinnerOpen } = useSpinner();
  return (
    <>
      {isSpinnerOpen && <Spinner />}
      <main className="w-full h-[100dvh] flex flex-row relative">
        <Sidebar />
        <section
          className={`flex-1 overflow-auto flex-col w-full transition-all duration-300 px-6 
  ml-0 mt-[48px] sm:mt-0 sm:py-3 sm:ml-20  md:ml-20 lg:ml-40`}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default MainWrapper;
