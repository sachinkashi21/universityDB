import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Show = () => {
  const [cls, setCls] = useState();
  const { id } = useParams();
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

  const handleAddCourse = () => {
    navigate(`/class/${id}/addcourse`);
  };

  const handleAddStudents = () => {
    navigate(`/class/${id}/addStudents`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/class/${id}`);
        setCls(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-[#1B3A57] mb-6">Class Details</h1>
      {cls && (
        <div className="space-y-8">
          {/* Class Info */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-[#1B3A57] flex items-center gap-2">
        {cls.Branch} <span className="text-gray-400">|</span> Sem {cls.Sem}
      </h2>
      <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-[#333E48] flex items-center gap-2">
          <span className="font-semibold">🎓 Degree:</span> {cls.Degree}
        </p>
        <p className="text-[#333E48] flex items-center gap-2">
          <span className="font-semibold">📅 Start Date:</span> {" "}
          {new Date(cls.StartDate).toLocaleDateString()}
        </p>
        <p className="text-[#333E48] flex items-center gap-2">
          <span className="font-semibold">⏳ End Date:</span> {" "}
          {new Date(cls.EndDate).toLocaleDateString()}
        </p>
      </div>
    </div>

          {/* Courses & Teachers */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-[#1B3A57] mb-6 border-b-2 border-gray-300 pb-2">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cls.Courses.map((course) => (
          <div
            onClick={() => navigate(`/classroom/${id}/${course.CourseCode}`)}
            key={course.CourseCode}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-[#1B3A57] mb-2">{course.Name}</h3>
              <p className="text-[#333E48] text-sm"><span className="font-semibold">Course Code:</span> {course.CourseCode}</p>
              <p className="text-[#333E48] text-sm"><span className="font-semibold">Credits:</span> {course.Credits}</p>
              <p className="text-[#333E48] text-sm"><span className="font-semibold">Department:</span> {course.DeptName}</p>
            </div>
            <hr className="my-3 border-gray-200" />
            <div className="text-sm text-[#333E48]">
              <p><span className="font-semibold">Teacher:</span> {course.FName} {course.MInit} {course.LName}</p>
              <p><span className="font-semibold">Contact Info:</span> {course.Email} | {course.Phone}</p>
            </div>
          </div>
        ))}
      </div>
            {
              user && user.role=="Admin" && 
              <div className="flex justify-end mt-6">
              <button
                onClick={handleAddCourse}
                className="py-2 px-6 text-white bg-[#D72638] hover:bg-[#C02031] rounded-lg font-semibold transition-all"
                >
                Add Course
              </button>
            </div>
              }
          </div>

          {/* Students Table */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-[#1B3A57] mb-4">Students</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#333E48]">
                <thead>
                  <tr className="bg-[#F7F9FB]">
                    <th className="border border-[#333E48] px-4 py-2 text-left text-[#1B3A57]">User ID</th>
                    <th className="border border-[#333E48] px-4 py-2 text-left text-[#1B3A57]">Name</th>
                    <th className="border border-[#333E48] px-4 py-2 text-left text-[#1B3A57]">Email</th>
                    <th className="border border-[#333E48] px-4 py-2 text-left text-[#1B3A57]">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {cls.Students.map((student) => (
                    <tr key={student.UserId} className="hover:bg-[#F5C32C]/20 cursor-pointer" onClick={() => navigate(`/student/dashboard/${student.UserId}`)}>
                      <td className="border border-[#333E48] px-4 py-2">{student.UserId}</td>
                      <td className="border border-[#333E48] px-4 py-2">{student.FName} {student.MInit} {student.LName}</td>
                      <td className="border border-[#333E48] px-4 py-2">{student.Email}</td>
                      <td className="border border-[#333E48] px-4 py-2">{student.Phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {
              user && user.role=="Admin" && 
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddStudents}
                className="py-2 px-6 text-white bg-[#D72638] hover:bg-[#C02031] rounded-lg font-semibold transition-all"
                >
                Add Students
              </button>
            </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Show;
