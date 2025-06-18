import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";

interface PropTypes {
  icon: ReactNode;
  title: string;
  navigateTo: string;
}

function SidebarItem({ icon, title, navigateTo }: PropTypes) {
  return (
    <NavLink
      to={navigateTo}
      className={({ isActive }) =>
        `flex text-gray-700 items-center space-x-2 rounded-lg p-2 transition-colors duration-300 ${
          isActive
            ? "bg-white shadow cursor-default text-gray-900"
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
