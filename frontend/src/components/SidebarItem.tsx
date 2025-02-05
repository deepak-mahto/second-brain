import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-100 rounded-lg pl-4 transition-all duration-200 ease-in-out">
      <div className="pr-2">{icon}</div>
      <div className="font-medium">{text}</div>
    </div>
  );
}
