import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const Attedance = () => {
  const { lectId, classId } = useParams(); // Get lecture and class ID from URL params
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // Fetch students for the given classId
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${classId}`); // Replace with your backend route
        setStudents(response.data.students);

        // Initialize attendance state
        const initialAttendance = {};
        response.data.students.forEach((student) => {
          initialAttendance[student.UserId] = "Absent"; // Default to 'Present'
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
  
    console.log("Attendance Data:", attendanceData);
  
    try {
      const response = await axios.post(
        `http://localhost:8080/lecture/attendance/${classId}/${lectId}`,
        attendanceData // Sending attendance data in the request body
      );
      toast.success(response.data.message)
      // console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };
  

  return (
    <div className="p-4">
      <ToastContainer/>
      <h1 className="text-2xl font-bold mb-4">Record Attendance</h1>
      <div className="overflow-auto border rounded-lg shadow-md p-4">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.UserId} className="border-b">
                <td className="px-4 py-2">{student.UserId}</td>
                <td className="px-4 py-2">{`${student.FName} ${student.LName}`}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={`attendance-${student.UserId}`}
                        value="Present"
                        checked={attendance[student.UserId] === "Present"}
                        onChange={(e) =>
                          handleAttendanceChange(student.UserId, e.target.value)
                        }
                      />
                      Present
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={`attendance-${student.UserId}`}
                        value="Absent"
                        checked={attendance[student.UserId] === "Absent"}
                        onChange={(e) =>
                          handleAttendanceChange(student.UserId, e.target.value)
                        }
                      />
                      Absent
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={`attendance-${student.UserId}`}
                        value="Partial"
                        checked={attendance[student.UserId] === "Partial"}
                        onChange={(e) =>
                          handleAttendanceChange(student.UserId, e.target.value)
                        }
                      />
                      Partial
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        onClick={handleSubmit}
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default Attedance;
