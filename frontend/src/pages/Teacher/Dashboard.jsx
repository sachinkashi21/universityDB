import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiBookOpen, FiCalendar } from "react-icons/fi";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.warn("Please log in to access the dashboard.");
      navigate("/user/login");
    } else {
      const usr = JSON.parse(userData);
      setUser(usr);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/teacher/dashboard/${user.userId}`);
        setData(res.data);
        toast.success("Dashboard loaded successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data.");
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!data) {
    return <div className="text-center mt-10 text-lg font-semibold text-[#333E48]">Loading...</div>;
  }

  const { teacher, curriculum, lectures } = data;

  return (
    <div className="container mx-auto px-4 py-6 bg-[#F7F9FB]">
      <ToastContainer />
      {/* Header */}
      <div className="flex items-center justify-between bg-[#1B3A57] text-white rounded-2xl p-6 mb-6 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src="https://placehold.co/400x400?text=User+Image"
            alt="Avatar"
            className="w-20 h-20 rounded-full border-4 border-[#F5C32C]"
          />
          <div>
            <h1 className="text-3xl font-bold">Welcome, {teacher.FName} {teacher.LName}</h1>
            <p className="text-[#F7F9FB]">Your role: {teacher.Role}</p>
          </div>
        </div>
      </div>

      {/* Assigned Courses */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-[#1B3A57] mb-4 flex items-center gap-2">
          <FiBookOpen className="text-[#D72638]" /> Assigned Courses
        </h2>
        {curriculum.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((cur, index) => (
              <div
                key={index}
                className="border border-[#333E48] rounded-2xl p-4 bg-[#F7F9FB] shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                onClick={() => navigate(`/classroom/${cur.ClassId}/${cur.CourseCode}`)}
              >
                <h3 className="font-semibold text-lg text-[#1B3A57] mb-2">{cur.Name} ({cur.CourseId})</h3>
                <p className="text-[#333E48]">Class: {cur.Branch}, {cur.Degree}, {cur.Sem} Sem</p>
                <p className="text-sm text-[#333E48]">Credits: {cur.Credits}</p>
                <p className="text-sm text-[#333E48]">Start Date: {new Date(cur.StartDate).toDateString()}</p>
                <p className="text-sm text-[#333E48]">End Date: {new Date(cur.EndDate).toDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#333E48]">No courses assigned.</p>
        )}
      </div>

      {/* Scheduled Lectures */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-[#1B3A57] mb-4 flex items-center gap-2">
          <FiCalendar className="text-[#D72638]" /> Scheduled Lectures
        </h2>
        {lectures.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#333E48]">
              <thead>
                <tr className="bg-[#F7F9FB]">
                  <th className="border border-[#333E48] px-4 py-2 text-[#1B3A57]">Class</th>
                  <th className="border border-[#333E48] px-4 py-2 text-[#1B3A57]">Course</th>
                  <th className="border border-[#333E48] px-4 py-2 text-[#1B3A57]">Date</th>
                  <th className="border border-[#333E48] px-4 py-2 text-[#1B3A57]">Time</th>
                </tr>
              </thead>
              <tbody>
                {lectures.map((lecture, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-[#333E48] px-4 py-2 text-[#333E48]">{lecture.Branch}, {lecture.Sem} SEM</td>
                    <td className="border border-[#333E48] px-4 py-2 text-[#333E48]">{lecture.CourseName}</td>
                    <td className="border border-[#333E48] px-4 py-2 text-[#333E48]">{new Date(lecture.Date).toDateString()}</td>
                    <td className="border border-[#333E48] px-4 py-2 text-[#333E48]">{lecture.Time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[#333E48]">No lectures scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
