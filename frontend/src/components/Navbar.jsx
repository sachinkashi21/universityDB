import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi"; 

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="bg-[#1B3A57] text-white fixed w-full z-20 top-0 left-0 border-b border-[#F5C32C]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3">
            <span className="text-2xl font-bold">Brand</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#F5C32C] p-2 rounded-md"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:w-auto w-full mt-4 md:mt-0 md:space-x-8 bg-[#1B3A57] md:bg-transparent rounded-lg p-4 md:p-0`}
          >
            <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-lg font-medium">
              <li>
                <span
                  onClick={() => navigate('/')}
                  className="hover:text-[#F5C32C] transition cursor-pointer"
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate('/class')}
                  className="hover:text-[#F5C32C] transition cursor-pointer"
                >
                  All Classes
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate('/course')}
                  className="hover:text-[#F5C32C] transition cursor-pointer"
                >
                  All Courses
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate('/')}
                  className="hover:text-[#F5C32C] transition cursor-pointer"
                >
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
            {/* Dashboard Button */}
            <div
              onClick={() => {
                const userData = localStorage.getItem("user");
                if (!userData) {
                  navigate("/user/login");
                } else {
                  const usr = JSON.parse(userData);
                  if(usr.role=="Teacher"){
                    navigate("/teacher/dashboard");
                  } else if(usr.role=="Student"){
                    navigate(`/student/dashboard/${usr.userId}`);
                  } else{
                    navigate(`/class`);
                  }
                }
              }}
              className="cursor-pointer text-white hover:text-[#F5C32C] font-semibold transition"
            >
              Dashboard
            </div>
          
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden md:block bg-[#D72638] hover:bg-[#C02031] text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
          ) : (
            <button
              className="hidden md:block bg-[#D72638] hover:bg-[#C02031] text-white px-5 py-2 rounded-lg font-semibold transition"
              onClick={() => navigate('/user/login')}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <div className="mb-20"></div>
    </>
  );
};

export default Navbar;
