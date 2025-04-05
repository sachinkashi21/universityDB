import React from "react";
import { Link } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F7F9FB] text-[#1B3A57] p-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex">
          <FaUniversity className="text-6xl text-[#D72638] mb-4" />
          <h1 className="text-4xl font-bold pt-4 pl-2">University Database</h1>
        </div>
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

      {/* Feature Highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {[
         {
          title: "Attendance Tracking",
          desc: "Record and monitor student attendance with ease and accuracy.",
        },
        {
          title: "Class Scheduling",
          desc: "Easily schedule lectures, allocate classrooms, and manage time slots.",
        },
        {
          title: "Assignment Management",
          desc: "Distribute assignments, set deadlines, and track student submissions.",
        },
        {
          title: "Course Management",
          desc: "Create, update, and assign courses to teachers and students.",
        },
        {
          title: "Report Generation",
          desc: "Generate detailed academic reports on demand.",
        },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 text-center border border-[#F7F9FB] hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400 text-center">
        © 2025 University Database.
      </footer>
    </div>
  );
};

export default Home;
