import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="bg-[#F7F9FB]">

      <main className="flex-1 bg-[#F7F9FB] min-h-screen">
        <div className="bg-white shadow-md">
          <Outlet />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#1B3A57] text-white py-4 mt-8">
        <div className="max-w-screen-xl mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} University Database. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
