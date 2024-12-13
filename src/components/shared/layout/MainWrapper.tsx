import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpinner } from "@/store/useSpinner";
import Spinner from "@/components/shared/Spinner";
import NavBar from "@/components/shared/layout/Sidebar";

const MainWrapper = ({ children }: { children: ReactNode }) => {
  const { isSpinnerOpen } = useSpinner();
  return (
    <main className="w-full h-[100dvh] flex flex-row relative">
      {isSpinnerOpen && <Spinner />}
      <ToastContainer />
      <NavBar />
      <section
        className={`flex-1 overflow-auto flex-col w-full transition-all duration-300 px-6 
  ml-0 mt-[48px] sm:mt-0 sm:py-3 sm:ml-20  md:ml-20 lg:ml-40`}
      >
        {children}
      </section>
    </main>
  );
};

export default MainWrapper;
