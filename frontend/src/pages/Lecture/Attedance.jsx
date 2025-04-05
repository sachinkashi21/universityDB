import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Attendance = () => {
  const { lectId, classId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${classId}`);
        setStudents(response.data.students);
        const initialAttendance = {};
        response.data.students.forEach((student) => {
          initialAttendance[student.UserId] = "Absent";
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [classId]);

  const handleAttendanceChange = (userId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [userId]: status,
    }));
  };

  const handleSubmit = async () => {
    const attendanceData = {
      lectureId: lectId,
      classId,
      attendance,
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/lecture/attendance/${classId}/${lectId}`,
        attendanceData
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-[#1B3A57] mb-6 border-b-2 border-[#F5C32C] pb-2">
        Mark Attendance
      </h1>

      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full text-sm bg-white rounded-2xl border border-[#F5C32C]">
          <thead className="bg-[#F7F9FB] text-[#1B3A57] text-base">
            <tr>
              <th className="py-3 px-6 border-b border-[#F5C32C] text-left">Student ID</th>
              <th className="py-3 px-6 border-b border-[#F5C32C] text-left">Name</th>
              <th className="py-3 px-6 border-b border-[#F5C32C] text-left">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.UserId}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F7F9FB]"}
              >
                <td className="py-3 px-6">{student.UserId}</td>
                <td className="py-3 px-6">{`${student.FName} ${student.LName}`}</td>
                <td className="py-3 px-6">
                  <div className="flex gap-4">
                    {["Present", "Absent", "Partial"].map((status) => (
                      <label key={status} className="flex items-center gap-2 text-[#333E48]">
                        <input
                          type="radio"
                          name={`attendance-${student.UserId}`}
                          value={status}
                          checked={attendance[student.UserId] === status}
                          onChange={(e) =>
                            handleAttendanceChange(student.UserId, e.target.value)
                          }
                          className="accent-[#D72638] cursor-pointer"
                        />
                        <span className="capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="mt-6 bg-[#D72638] hover:bg-[#C02031] text-white px-6 py-3 rounded-lg shadow transition duration-300 text-base"
        onClick={handleSubmit}
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default Attendance;
