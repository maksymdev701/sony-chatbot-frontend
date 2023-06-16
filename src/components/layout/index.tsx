import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const MainLayout = () => {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="flex-1 h-full flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
