import { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  isSidebarOpen: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  text,
  icon,
  isSidebarOpen,
  onClick,
}: SidebarItemProps) {
  return (
    <div
      className={`flex ${
        !isSidebarOpen && "items-center justify-center pl-4 pr-4 mr-6"
      } text-gray-700 py-2 cursor-pointer hover:bg-gray-100 rounded-lg pl-4 transition-all duration-200 ease-in-out mr-6`}
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center pr-2 ${
          !isSidebarOpen && "pr-0"
        }`}
      >
        {icon}
      </div>
      <div className={`${!isSidebarOpen && "hidden"}`}>{text}</div>
    </div>
  );
}
