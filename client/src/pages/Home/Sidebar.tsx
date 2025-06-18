import {
  BellIcon,
  BellAlertIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import * as anime from "animejs";

function Sidebar() {
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

    const tlNavigation = new anime.Timeline({
      duration: 300,
    });
    const classes = [0, 1, 2, 3, 4].map((v) => "#sidebar-item-" + v).join(", ");
    tlNavigation.add(
      classes,
      {
        translateX: [-50, 0],
        opacity: [0, 1],
      },
      anime.stagger(100)
    );
  });
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
            <h2 className="">Usama Mangi</h2>
            <h4 className="text-sm font-extralight">usama@gmail.com</h4>
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
          index={0}
          icon={<HomeIcon />}
          title="Dashboard"
          navigateTo="/home/dashboard"
        />
        <SidebarItem
          index={2}
          icon={<UserGroupIcon />}
          title="Team View"
          navigateTo="/home/team"
        />
        <SidebarItem
          index={3}
          icon={<UserIcon />}
          title="My Tasks"
          navigateTo="/home/my-tasks"
        />
        <SidebarItem
          index={1}
          icon={<CubeIcon />}
          title="New Project"
          navigateTo="/home/new-project"
        />
        <SidebarItem
          index={1}
          icon={<ClipboardIcon />}
          title="New Task"
          navigateTo="/home/new-task"
        />
      </div>
      <div>
        <SidebarItem
          index={4}
          icon={<Cog6ToothIcon />}
          title="Settings"
          navigateTo="/settings"
        />
        <button
          onClick={() => console.log("Log the user out")}
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
