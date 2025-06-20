import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface PropTypes {
  icon: ReactNode;
  title: string;
  navigateTo: string;
}

function SidebarItem({ icon, title, navigateTo }: PropTypes) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = location.pathname.endsWith(navigateTo);

  return (
    <button
      onClick={() => navigate(navigateTo)}
      disabled={isSelected}
      className={`sidebar-item opacity-0 flex w-full text-gray-700 items-center space-x-2 rounded-lg p-2 transition-colors duration-300 ${
        isSelected
          ? "bg-white border border-gray-200 shadow text-gray-900"
          : "hover:bg-gray-300 cursor-pointer"
      }`}
    >
      <div className="size-5">{icon}</div>
      <span>{title}</span>
    </button>
  );
}

export default SidebarItem;
