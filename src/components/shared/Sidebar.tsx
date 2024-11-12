import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useSidebar } from "../../store/useSidebar";
import bizLogo from "../../assets/images/biz-logo.png";
import FaceFrown from "../../assets/FaceFrown";
import Accordion from "./Accordion";
import DropDown from "./DropDown";
import LogOutIcon from "../../assets/LogOutIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import useWindowWidth from "../../hooks/useWindowWidth";
import HamburgerIcon from "../../assets/HamburgerIcon";

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

const menuData = [
  {
    title: "정기권",
    content: [
      {
        title: "이용현황",
        content: "/ticket",
      },
      {
        title: "신청목록",
        content: "/ticket-request",
      },
      {
        title: "신청하기",
        content: "/ticket-request/new",
      },
    ],
  },
  {
    title: "결제 / 환불",
    content: [
      {
        title: "결제이력",
        content: "/payment",
        children: [
          {
            title: "결제상세",
            content: "/payment/detail",
          },
        ],
      },
    ],
  },
  {
    title: "파트너",
    content: [
      {
        title: "파트너상세",
        content: "/partner",
      },
      {
        title: "멤버목록",
        content: "/partner-user",
      },
    ],
  },
];

const dummyData = {
  data: {
    userName: "테스트",
  },
};

const NavBar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isDisplay, setIsDisplay } =
    useSidebar();
  const navigate = useNavigate();
  const containerControls = useAnimationControls();
  const { signOut } = useAuth();
  const { data } = dummyData;
  const width = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const onSignOut = () => {
    signOut();
    navigate("/");
  };

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
  }, [width]);

  useEffect(() => {
    if (isSidebarOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isSidebarOpen]);

  return (
    <>
      {isDisplay ? (
        <motion.nav
          variants={containerVariants}
          animate={containerControls}
          initial={isSidebarOpen ? "open" : "close"}
          className={`bg-white flex flex-col z-10 gap-5 p-5 fixed items-center top-0 left-0 h-full shadow`}
        >
          <div className={`flex w-full justify-center place-items-center`}>
            {isSidebarOpen ? (
              <img src={bizLogo} className="object-cover" />
            ) : (
              <FaceFrown />
            )}
          </div>

          <div
            className={`w-full flex ${
              isSidebarOpen && "flex-col gap-0"
            }  items-center justify-center`}
          >
            <img
              className={`lg:w-20 lg:h-20 md:w-10 md:h-10 border-none rounded-full`}
              src="https://img.freepik.com/free-psd/3d-illustration-bald-person_23-2149436183.jpg?t=st=1729943150~exp=1729946750~hmac=c8c0d8f36ed5fbf304c8e03da5ae93f6ade5b8a146220329f61306fa54534a4a&w=740"
            />
            {isSidebarOpen && (
              <div className="flex py-4 items-center w-full justify-center relative">
                <p>{data.userName}님</p>
                <button
                  className="p-1 rounded absolute right-0 text-neutral-600"
                  onClick={onSignOut}
                >
                  <LogOutIcon />
                </button>
              </div>
            )}
          </div>
          {isSidebarOpen ? (
            <Accordion data={menuData} />
          ) : (
            <DropDown data={menuData} />
          )}
        </motion.nav>
      ) : (
        <div
          className={`flex bg-white justify-between z-10 p-5 fixed items-center top-0 h-[48px] w-full shadow`}
        >
          <img src={bizLogo} className="object-cover w-24" />
          <div onClick={() => setIsOpen(!isOpen)}>
            <HamburgerIcon />
          </div>
          {isOpen && (
            <div className="fixed top-[48px] left-0 w-full">
              <Accordion data={menuData} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavBar;
