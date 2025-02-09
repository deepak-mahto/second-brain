import { useState } from "react";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { CloseIcon } from "../icons/CloseIcon";
import { MenuIcon } from "../icons/MenuIcon";

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md md:hidden"
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className={`h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 shadow-sm transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex text-2xl pt-8 items-center font-semibold text-gray-800">
          <div className="pr-2 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>

        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-purple-600"
        >
          <CloseIcon />
        </button>

        <div className="pt-8 pl-4 space-y-2">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        </div>
      </div>
    </>
  );
}
