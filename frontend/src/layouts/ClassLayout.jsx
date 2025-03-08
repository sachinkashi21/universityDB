import { Outlet } from "react-router-dom";

const ClassLayout = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-indigo-100 to-indigo-300 min-h-screen">
      <Outlet />
    </div>
  );
};

export default ClassLayout;