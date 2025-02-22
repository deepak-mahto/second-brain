import { useState, useEffect } from "react";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { CloseIcon } from "../icons/CloseIcon";
import { MenuIcon } from "../icons/MenuIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onItemClick: (item: "tweet" | "video") => void;
}

export function Sidebar({ onItemClick }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
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
          <div
            className="cursor-pointer"
            onClick={() => (window.location.href = "/dashboard")}
          >
            SecondBrain
          </div>
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
          "flex items-center flex-col justify-center pt-4 pl-1 space-y-0"
        } pt-8 pl-4 space-y-2`}
      >
        <SidebarItem
          text="Twitter"
          icon={<TwitterIcon />}
          isSidebarOpen={isSidebarOpen}
          onClick={() => onItemClick("tweet")}
        />
        <SidebarItem
          text="Youtube"
          icon={<YoutubeIcon />}
          isSidebarOpen={isSidebarOpen}
          onClick={() => onItemClick("video")}
        />
      </div>

      <div
        className={`absolute bottom-4 left-4 right-4 ${
          !isSidebarOpen && "flex justify-center"
        }`}
      >
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${
            !isSidebarOpen && "justify-center"
          }`}
        >
          <LogoutIcon />
          {isSidebarOpen && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </div>
  );
}
