import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useSidebar } from "../../store/useSidebar";

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const containerControls = useAnimationControls();

  useEffect(() => {
    if (isSidebarOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isSidebarOpen]);

  return (
    <motion.nav
      variants={containerVariants}
      animate={containerControls}
      initial="close"
      className="bg-neutral-900 flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
    >
      <div className="flex flex-row w-full justify-between place-items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-700 rounded-full">
          <button className="p-1 rounded flex" onClick={toggleSidebar}>
            ＞
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
