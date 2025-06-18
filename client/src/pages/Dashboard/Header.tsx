import { NavLink } from "react-router-dom";

function Header() {
  function getNavStyle(status: any) {
    return status.isActive
      ? "text-blue-500 focus:outline-none cursor-default"
      : "text-gray-800 focus:outline-none hover:text-blue-800 hover:scale-105 transition-transform duration-300 ease-in-out";
  }

  return (
    <nav className="flex items-center text-sm">
      <h1 className="flex-1/3 text-xl font-semibold">TaskManager</h1>

      <div className="flex flex-1/3 justify-center items-center gap-4 font-semibold">
        <NavLink to="/dashboard" className={getNavStyle}>
          Home
        </NavLink>
        <NavLink to="/features" className={getNavStyle}>
          Features
        </NavLink>
        <NavLink to="/pricing" className={getNavStyle}>
          Pricing
        </NavLink>
        <NavLink to="/contact" className={getNavStyle}>
          Contact
        </NavLink>
      </div>

      <div className="flex flex-1/3 justify-end items-center gap-4">
        <NavLink to="/login" className="text-gray-700 focus:outline-none">
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="bg-black/90 px-4 py-2 rounded-full text-white focus:outline-none hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Get Started
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
