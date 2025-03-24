import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return navigate("/user/login");
    }

    const userId = JSON.parse(localStorage.getItem("user")).userId;
    
    const fetchData = async () => {
      try {
        let res = await axios.get(`http://localhost:8080/teacher/dashboard/${userId}`);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  if (!data) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  const { teacher, curriculum, lectures } = data;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Teacher Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">Teacher Details</h2>
        {teacher ? (
          <div className="text-gray-700">
            <p><strong>Name:</strong> {teacher.FName} {teacher.LName}</p>
            <p><strong>Email:</strong> {teacher.Email}</p>
            <p><strong>Phone:</strong> {teacher.Phone}</p>
            <p><strong>Role:</strong> {teacher.Role}</p>
          </div>
        ) : (
          <p>No teacher data available.</p>
        )}
      </div>

      {/* Assigned Courses Grid */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Assigned Courses</h2>
        {curriculum.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {curriculum.map((cur, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50" onClick={()=>{navigate(`/teacher/${cur.ClassId}/${cur.CourseCode}`)}}>
                <h3 className="font-semibold text-lg">{cur.Name} ({cur.CourseId})</h3>
                <p className="text-gray-600">Class: {cur.Branch}, {cur.Degree}, {cur.Sem} Sem</p>
                <p className="text-sm text-gray-500">Credits: {cur.Credits}</p>
                <p className="text-sm text-gray-500">Start Date: {new Date(cur.StartDate).toDateString()}</p>
                <p className="text-sm text-gray-500">End Date: {new Date(cur.EndDate).toDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No curs assigned.</p>
        )}
      </div>

      {/* Scheduled Lectures Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Scheduled Lectures</h2>
        {lectures.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Class</th>
                  <th className="border border-gray-300 px-4 py-2">Course</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {lectures.map((lecture, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{lecture.Branch}, {lecture.Sem} SEM</td>
                    <td className="border border-gray-300 px-4 py-2">{lecture.CourseName}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(lecture.Date).toDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{lecture.Time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No lectures scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
