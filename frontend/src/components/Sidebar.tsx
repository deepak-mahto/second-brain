import { useState, useEffect } from "react";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { CloseIcon } from "../icons/CloseIcon";
import { MenuIcon } from "../icons/MenuIcon";

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className={`h-screen bg-white border-r fixed left-0 top-0 pl-6 shadow-sm transition-all duration-200 ease-in-out ${
          isSidebarOpen ? "w-72" : "w-20 pl-4"
        }`}
      >
        <div className="flex text-2xl pt-8 items-center justify-between pr-4 font-semibold text-gray-800">
          <div
            className={`flex items-center pr-2 text-purple-600 gap-2 ${
              !isSidebarOpen && "hidden"
            }`}
          >
            <Logo />
            <div>SecondBrain</div>
          </div>

          <button
            onClick={toggleSidebar}
            className="top-4 left-4 z-50 p-1 bg-white rounded-lg shadow-md cursor-pointer"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          className={`${
            !isSidebarOpen &&
            "flex items-center flex-col justify-center pt-4 pl-0 space-y-0"
          } pt-8 pl-4 space-y-2`}
        >
          <SidebarItem
            text="Twitter"
            icon={<TwitterIcon />}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            text="Youtube"
            icon={<YoutubeIcon />}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </>
  );
}
