import {
  BellIcon,
  BellAlertIcon,
  HomeIcon,
  UserGroupIcon,
  PlusCircleIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import * as anime from "animejs";

function Sidebar() {
  useEffect(() => {
    const tlTop = new anime.Timeline({
      duration: 1000,
      delay: anime.stagger(100),
    });
    const tlNavigation = new anime.Timeline({
      duration: 1000,
      delay: anime.stagger(100),
    });

    tlTop
      .add(".profile-container", {
        translateX: [-25, 0],
        opacity: [0, 1],
        duration: 500,
      })
      .add(
        ".search-container",
        {
          translateY: [15, 0],
          opacity: [0, 1],
          duration: 500,
        },
        "-=300"
      );

    const animationObject = {
      translateX: [-100, 0],
      opacity: [0, 1],
      duration: 300,
    };
    tlNavigation
      .add("#sidebar-item-0", animationObject)
      .add("#sidebar-item-1", animationObject, "-=100")
      .add("#sidebar-item-2", animationObject, "-=100")
      .add("#sidebar-item-3", animationObject, "-=100")
      .add("#sidebar-item-4", animationObject, "-=100");
  });
  const isNotificationPresent = true; //TODO: This should be replaced with actual logic to check for notifications

  return (
    <aside className="min-h-screen flex flex-col space-y-10 p-6 max-w-2xs">
      <div className="flex flex-col items-center space-y-6 w-full">
        <div className="profile-container opacity-0 flex justify-between w-full items-center space-x-2">
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="Profile"
            className="w-10 h-10 rounded-xl"
          />
          <div className="flex flex-col flex-1 items-start">
            <h2 className="">Kevin Dukkon</h2>
            <h4 className="text-sm font-extralight">hey@kevdu.co</h4>
          </div>
          {isNotificationPresent ? (
            <BellAlertIcon className="h-5 w-5 text-blue-500" />
          ) : (
            <BellIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      <div className="search-container opacity-0 flex items-center bg-gray-200 shadow rounded-lg">
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
          index={1}
          icon={<PlusCircleIcon />}
          title="New Task"
          navigateTo="/new-task"
        />
        <SidebarItem
          index={2}
          icon={<UserGroupIcon />}
          title="Team View"
          navigateTo="/team"
        />
        <SidebarItem
          index={3}
          icon={<UserIcon />}
          title="My Tasks"
          navigateTo="/my-tasks"
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
