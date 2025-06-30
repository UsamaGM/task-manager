import {
  BellIcon,
  BellAlertIcon,
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  MagnifyingGlassIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import * as anime from "animejs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const { logout, user } = useAuth();

  useEffect(() => {
    anime.animate(".profile-container", {
      translateX: [0, "-2rem"],
      duration: 500,
    });
    anime.animate(".search-container", {
      translateY: [0, "-2rem"],
      opacity: [0, 1],
      duration: 500,
    });
    anime.animate(".sidebar-item", {
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 300,
      delay: anime.stagger(100),
    });
  }, []);

  const navigate = useNavigate();
  function handleLogout() {
    const toastId = toast.warn(
      <div className="w-full">
        <h2>Confirm logout</h2>
        <h4>Do you really want to log out?</h4>
        <div className="flex justify-end space-x-2 w-full text-sm font-semibold mt-4">
          <button
            onClick={() => toast.dismiss(toastId)}
            className="bg-blue-300 text-blue-900 rounded-lg p-2 shadow cursor-pointer hover:bg-blue-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
              toast.dismiss();
            }}
            className="bg-red-300 text-red-900 rounded-lg p-2 shadow cursor-pointer hover:bg-red-200"
          >
            Yes, log me out
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        position: "bottom-left",
      }
    );
  }

  const isNotificationPresent = true; //TODO: This should be replaced with actual logic to check for notifications

  return (
    <aside className="min-h-screen flex flex-col space-y-10 p-6 max-w-2xs w-full">
      <div className="flex flex-col items-center space-y-6 w-full">
        <div className="profile-container translate-x-8 flex justify-between w-full items-center space-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="Profile"
            className="w-10 h-10 rounded-xl"
          />
          <div className="flex flex-col flex-1 items-start">
            <h2 className="">{user?.username}</h2>
            <h4 className="text-sm font-extralight">{user?.email}</h4>
          </div>
          {isNotificationPresent ? (
            <BellAlertIcon className="h-5 w-5 text-blue-500" />
          ) : (
            <BellIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      <div className="search-container opacity-0 translate-y-8 flex items-center bg-gray-200 ring ring-gray-400 shadow focus-within:ring-blue-500 rounded-lg">
        <MagnifyingGlassIcon className="size-5 text-gray-800 m-2" />
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="outline-none w-full text-gray-900"
        />
      </div>
      <div className="flex-1 space-y-2">
        <SidebarItem
          icon={<HomeIcon />}
          title="Dashboard"
          navigateTo="/home/dashboard"
        />
        <SidebarItem
          icon={<UserGroupIcon />}
          title="My Teams"
          navigateTo="/home/my-teams"
        />
        <SidebarItem
          icon={<CubeIcon />}
          title="My Projects"
          navigateTo="/home/my-projects"
        />
        <SidebarItem
          icon={<DocumentTextIcon />}
          title="My Tasks"
          navigateTo="/home/my-tasks"
        />
      </div>
      <div>
        <SidebarItem
          icon={<Cog6ToothIcon />}
          title="Settings"
          navigateTo="/settings"
        />
        <button
          onClick={handleLogout}
          className="w-full flex space-x-2 text-start cursor-pointer p-2 rounded-lg text-red-600 hover:bg-red-200 transition-colors duration-300"
        >
          <ArrowLeftStartOnRectangleIcon className="size-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
