import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Navbar = ({isLoggedIn,setIsLoggedIn}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();

  let handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  return (
    <>
    <nav className="bg-indigo-900 text-white fixed w-full z-20 top-0 start-0 border-b border-indigo-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3">
          {/* <img src="" className="h-8" alt="Logo" /> */}
          <span className="text-2xl font-bold">###</span>
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 p-2 rounded-md"
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
          } md:flex md:items-center md:w-auto w-full mt-4 md:mt-0 md:space-x-8 bg-indigo-800 md:bg-transparent rounded-lg p-4 md:p-0`}
          >
          <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-lg font-medium">
            <li><span onClick={()=>navigate('/')} className="hover:text-orange-400 transition">Home</span></li>
            <li><span onClick={()=>navigate('/class')} className="hover:text-orange-400 transition">All-Classes</span></li>
            <li><span onClick={()=>navigate('/course')} className="hover:text-orange-400 transition">All-Courses</span></li>
            <li><span onClick={()=>navigate('/')} className="hover:text-orange-400 transition">Contact</span></li>
          </ul>
        </div>

        {(isLoggedIn) ?<button onClick={handleLogout} className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-semibold transition">Logout</button>
        :<button className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-semibold transition" onClick={()=>{navigate("/login")}} >Login</button>
      }
      </div>
    </nav>
    <div className='mb-20'></div>
    </>
  );
};

export default Navbar;