import React from "react";
import { Link } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F9FB] text-[#1B3A57] p-6">
      {/* Header */}
      <div className="text-center">
        <FaUniversity className="text-6xl text-[#D72638] mb-4" />
        <h1 className="text-4xl font-bold">University Database</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-lg">
          Manage your university data efficiently. Track students, courses, attendance, and more in one place.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-8 flex gap-4">
        <Link
          to="/user/login"
          className="bg-[#D72638] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#C02031] transition"
        >
          Get Started
        </Link>
        <Link
          to="/user/register"
          className="bg-gray-100 text-[#1B3A57] px-6 py-3 rounded-lg font-semibold hover:border-[#F5C32C] hover:border-2 transition"
        >
          Add Member
        </Link>
      </div>
    </div>
  );
};

export default Home;