import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="bg-white shadow rounded-3xl h-[calc(100vh-1rem)] w-full m-2 ml-0 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
