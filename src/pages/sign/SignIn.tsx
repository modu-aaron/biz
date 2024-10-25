import Sidebar from "../../components/shared/Sidebar";
import { useSidebar } from "../../store/useSidebar";

const SignIn = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <main className="w-full h-screen flex flex-row relative">
      <Sidebar />
      <section
        className={`flex flex-col ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } w-full gap-5 transition-all duration-300`}
      >
        <h1 className="text-4xl text-red-500">메인</h1>
        <div className="w-full h-80 border border-neutral-500/50 rounded " />
        <div className="w-full h-80 border border-neutral-500/50 rounded " />
      </section>
    </main>
  );
};

export default SignIn;
