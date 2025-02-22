import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useSidebar } from "@/store/useSidebar";
import bizLogo from "@/assets/images/biz-logo.png";
import bizSmallLogo from "@/assets/images/biz-s-logo.png";
import Accordion from "@/shared/components/Accordion";
import DropDown from "@/shared/components/DropDown";
import { useAuth } from "@/store/useAuth";
import useWindowWidth from "@/hooks/useWindowWidth";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  open: {
    width: "10rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const Sidebar = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isDisplay,
    setIsDisplay,
    isInitialized,
    initializeSidebar,
  } = useSidebar();
  const navigate = useNavigate();
  const containerControls = useAnimationControls();
  const { signOut, menus, user } = useAuth();
  const width = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (width < 480) {
      setIsDisplay(false);
    }
    if (480 <= width && width < 1024) {
      setIsSidebarOpen(false);
      setIsDisplay(true);
    }
    if (width >= 1024) {
      setIsSidebarOpen(true);
    }
    initializeSidebar();
  }, [width]);

  useEffect(() => {
    if (isSidebarOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isSidebarOpen]);

  const onSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      {isDisplay ? (
        <motion.nav
          variants={containerVariants}
          animate={containerControls}
          initial={isSidebarOpen ? "open" : "close"}
          className={`bg-white flex flex-col z-10 gap-5 p-4 fixed items-center top-0 left-0 h-full shadow`}
        >
          <div className={`flex w-full justify-center place-items-center`}>
            {isSidebarOpen ? (
              <img src={bizLogo} className="object-cover" />
            ) : (
              <img src={bizSmallLogo} className="object-cover" />
            )}
          </div>

          <div
            className={`w-full flex ${
              isSidebarOpen && "flex-col gap-0"
            }  items-center justify-center`}
          >
            <img
              onClick={() => navigate("/user-profile")}
              className={`lg:w-20 lg:h-20 md:w-10 md:h-10 border-none rounded-full cursor-pointer`}
              src="https://ca.slack-edge.com/T04GJSZC2-U06DV3V3TL6-f19097d81964-512"
            />
            {isSidebarOpen && (
              <div className="flex py-4 items-center w-full justify-center relative">
                <a href="/user-profile" className="hover:text-[#0078ff]">
                  {user?.name} 님
                </a>
                <button
                  className="p-1 rounded absolute right-0 text-neutral-600"
                  onClick={onSignOut}
                >
                  <IoLogOutOutline size={20} />
                </button>
              </div>
            )}
          </div>
          {isSidebarOpen ? (
            <Accordion data={menus} />
          ) : (
            <DropDown data={menus} />
          )}
          {!isSidebarOpen && (
            <div className="flex py-4 absolute bottom-5 items-center justify-center w-full">
              <button
                className="p-1 rounded text-neutral-600"
                onClick={onSignOut}
              >
                <IoLogOutOutline size={24} />
              </button>
            </div>
          )}
        </motion.nav>
      ) : (
        <div
          className={`flex bg-white justify-between z-10 p-4 fixed items-center top-0 h-[48px] w-full shadow border-b-neutral-500`}
        >
          <img src={bizLogo} className="object-cover w-24" />
          <div className="flex gap-2 items-center">
            <span onClick={handleToggle}>
              <RxHamburgerMenu />
            </span>
          </div>
          {isOpen && (
            <div className="fixed top-[48px] left-0 w-full">
              <Accordion data={menus} />
              <div
                className={`pb-4 pt-10 border-b flex justify-between items-center border-neutral-200 cursor-pointer bg-white px-5 md:px-0 text-sm text-slate-500`}
              >
                <a href="/user-profile">
                  <img
                    className={`w-10 h-10 border-none rounded-full cursor-pointer`}
                    src="https://ca.slack-edge.com/T04GJSZC2-U06DV3V3TL6-f19097d81964-512"
                  />
                </a>
                <div onClick={onSignOut}>로그아웃</div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
