import * as anime from "animejs";
import { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Settings() {
  const previousAnimation = useRef<anime.JSAnimation>(null);
  function runAnimation(title: string) {
    if (previousAnimation.current) {
      previousAnimation.current.reverse().then(
        () =>
          (previousAnimation.current = anime.animate(`#${title} > hr`, {
            width: [0, "100%"],
            duration: 400,
            ease: "inOutSine",
          }))
      );
      return;
    }
    previousAnimation.current = anime.animate(`#${title} > hr`, {
      width: [0, "100%"],
      duration: 400,
      ease: "inOutSine",
    });
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div>
        <h3 className="text-gray-800 text-3xl font-bold">Settings</h3>
        <h5 className="text-gray-600">
          Manage your account settings and preferences.
        </h5>
      </div>
      <nav className="flex justify-between bg-gray-100 text-gray-500 font-semibold rounded-xl">
        <StyledNavLink title="Details" to="./details" />
        <StyledNavLink title="Profile" to="./profile" />
        <StyledNavLink title="Password" to="./password" />
        <StyledNavLink title="Team" to="./team" />
        <StyledNavLink title="Billing" to="./billing" />
        <StyledNavLink title="Plan" to="./plan" />
        <StyledNavLink title="Email" to="./email" />
        <StyledNavLink title="Notifications" to="./notifications" />
      </nav>
      <Outlet />
    </div>
  );

  interface StyledNavLinkProps {
    title: string;
    to: string;
  }

  function StyledNavLink({ title, to }: StyledNavLinkProps) {
    function getClasses({ isActive }: { isActive: boolean }) {
      if (isActive) runAnimation(title);

      return `flex flex-col flex-1 items-center mx-4 transition-colors duration-400 ${
        isActive ? "text-gray-800" : "hover:text-gray-600"
      }`;
    }

    return (
      <NavLink id={title} to={to} className={getClasses}>
        <p className="py-2">{title}</p>
        <hr className="w-0" />
      </NavLink>
    );
  }
}

export default Settings;
