import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  isSidebarOpen,
}: {
  text: string;
  icon: ReactElement;
  isSidebarOpen: boolean;
}) {
  return (
    <div
      className={`flex ${
        !isSidebarOpen && "items-center justify-center pl-4 pr-4 mr-6"
      } text-gray-700 py-2 cursor-pointer hover:bg-gray-100 rounded-lg pl-4 transition-all duration-200 ease-in-out mr-6`}
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
