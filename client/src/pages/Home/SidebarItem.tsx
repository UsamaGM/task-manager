import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface PropTypes {
  icon: ReactNode;
  title: string;
  navigateTo: string;
  index: number;
}

function SidebarItem({ icon, title, navigateTo, index }: PropTypes) {
  return (
    <NavLink
      to={navigateTo}
      id={`sidebar-item-${index}`}
      className={({ isActive }) =>
        `opacity-0 flex text-gray-700 items-center space-x-2 rounded-lg p-2 transition-colors duration-300 ${
          isActive
            ? "bg-white border border-gray-200 shadow cursor-default text-gray-900"
            : "hover:bg-gray-300"
        }`
      }
    >
      <div className="size-5">{icon}</div>
      <span>{title}</span>
    </NavLink>
  );
}

export default SidebarItem;
