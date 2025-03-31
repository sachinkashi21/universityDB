import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const [user, setUser] = useState();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/user/login");
    } else {
      const usr = JSON.parse(userData);
      //   console.log(usr);
      setUser(usr);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:8080/class");
        setClasses(response.data);
      } catch (error) {
        toast.error("Error fetching classes.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col">
      <ToastContainer />

      {/* Navbar */}
      <div className="w-full py-4 px-8 flex justify-between items-center border-b-4 border-[#F5C32C]">
        <h1 className="text-3xl font-bold">Class Management</h1>
        {
          user && user.role === "Admin" &&
          <button
            onClick={() => navigate("/class/new")}
            className="bg-[#D72638] text-white py-2 px-6 rounded-lg hover:bg-[#C02031] transition duration-300"
          >
            Add Class
          </button>}
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto mt-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#1B3A57] mb-2">
            All Classes in university
          </h2>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.ClassId}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/class/${cls.ClassId}`)}
            >
              <h3 className="text-2xl font-bold text-[#1B3A57]">
                {cls.Branch} - Sem {cls.Sem}
              </h3>
              <p className="text-[#333E48] mt-2">
                Degree: <span className="font-medium">{cls.Degree}</span>
              </p>
              <p className="text-[#333E48]">
                Start Date: <span className="font-medium">{new Date(cls.StartDate).toLocaleDateString()}</span>
              </p>
              <p className="text-[#333E48]">
                End Date: <span className="font-medium">{new Date(cls.EndDate).toLocaleDateString()}</span>
              </p>
            </div>
          ))}
        </div>

        {/* No Classes Message */}
        {classes.length === 0 && (
          <p className="text-center text-lg text-[#333E48] mt-8">
            No classes available.
          </p>
        )}
      </main>
    </div>
  );
};

export default Index;
