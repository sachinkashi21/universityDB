import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMarks = () => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const { classId, courseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/student/${classId}`);
        if (res.data.error) {
          return toast.error(res.data.error);
        }
        setStudents(res.data.students);
        const initialMarks = {};
        res.data.students.forEach((student) => {
          initialMarks[student.UserId] = { SEEMarks: '', CIEMarks: '' };
        });
        setMarks(initialMarks);
      } catch (error) {
        toast.error('Failed to fetch students.');
      }
    };
    fetchData();
  }, [classId]);

  const handleInputChange = (studentId, field, value) => {
    setMarks({
      ...marks,
      [studentId]: {
        ...marks[studentId],
        [field]: value,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = Object.entries(marks).map(([studentId, markData]) => ({
        StudentId: studentId,
        ...markData,
      }));
      const res = await axios.post(
        `http://localhost:8080/report/${classId}/${courseId}`,
        payload
      );
      if (res.data.success) {
        toast.success('Marks submitted successfully!');
      } else {
        toast.error(res.data.error || 'Failed to submit marks.');
      }
    } catch (error) {
      toast.error('An error occurred while submitting marks.');
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add Marks</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-black-300">
          <thead>
            <tr>
              <th className="border border-black-300 px-4 py-2">Student ID</th>
              <th className="border border-black-300 px-4 py-2">Name</th>
              <th className="border border-black-300 px-4 py-2">SEE Marks</th>
              <th className="border border-black-300 px-4 py-2">CIE Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.UserId}>
                <td className="border border-black-300 px-4 py-2 text-center">
                  {student.UserId}
                </td>
                <td className="border border-black-300 px-4 py-2">
                  {student.FName} {student.LName}
                </td>
                <td className="border border-black-300 px-4 py-2">
                  <input
                    type="number"
                    className="w-full border border-black-300 rounded-md p-2"
                    value={marks[student.UserId]?.SEEMarks || ''}
                    onChange={(e) =>
                      handleInputChange(student.UserId, 'SEEMarks', e.target.value)
                    }
                  />
                </td>
                <td className="border border-black-300 px-4 py-2">
                  <input
                    type="number"
                    className="w-full border border-black-300 rounded-md p-2"
                    value={marks[student.UserId]?.CIEMarks || ''}
                    onChange={(e) =>
                      handleInputChange(student.UserId, 'CIEMarks', e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit Marks
      </button>
    </div>
  );
};

export default AddMarks;
