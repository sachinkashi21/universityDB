import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const Generate = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [reports, setReports] = useState([]);
  const [student, setStudent] = useState(null);
  const [cls, setCls] = useState(null);

  const { studentId, classId } = useParams();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/course/${classId}`);
        setAllCourses(res.data);
      } catch (error) {
        toast.error('Failed to fetch courses.');
      }
    };

    const fetchAllReports = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/report/${classId}/${studentId}`);
        setReports(res.data);
      } catch (error) {
        toast.error('Failed to fetch reports.');
      }
    };

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/student/dashboard/${studentId}`);
        setStudent(res.data.student[0]);
      } catch (error) {
        toast.error('Failed to fetch student data.');
      }
    };

    const fetchClass = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/class/${classId}`);
        setCls(res.data);
      } catch (error) {
        toast.error('Failed to fetch class data.');
      }
    };

    fetchClass();
    fetchAllCourses();
    fetchAllReports();
    fetchStudent();
  }, [classId, studentId]);

  const calculateCGPA = () => {
    let totalCredits = 0;
    let weightedGradePoints = 0;

    reports.forEach((report) => {
      const course = allCourses.find((c) => c.CourseId === report.CourseId);
      if (course) {
        const gradePoint = getGradePoint(report.Grade);
        totalCredits += course.Credits;
        weightedGradePoints += gradePoint * course.Credits;
      }
    });

    return totalCredits > 0 ? (weightedGradePoints / totalCredits).toFixed(2) : 'N/A';
  };

  const getGradePoint = (grade) => {
    const gradeMapping = {
      'A+': 10,
      A: 9,
      'B+': 8,
      B: 7,
      'C+': 6,
      C: 5,
      D: 4,
      F: 0,
    };
    return gradeMapping[grade] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Student Report Card</h1>
        {student && cls && (
          <div className="mb-6">
            <p>
              <strong>Student Name:</strong> {`${student.FName} ${student.MInit}. ${student.LName}`}
            </p>
            <p>
              <strong>Student ID:</strong> {student.UserId}
            </p>
            <p>
              <strong>Class:</strong> Semester {cls.Sem} | {cls.Branch}
            </p>
            <p>
              <strong>Degree:</strong> {cls.Degree}
            </p>
            <p>
              <strong>Session:</strong> {new Date(cls.StartDate).toLocaleDateString()} -{' '}
              {new Date(cls.EndDate).toLocaleDateString()}
            </p>
          </div>
        )}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Course Name</th>
              <th className="border border-gray-300 p-2">Course Code</th>
              <th className="border border-gray-300 p-2">CIE Marks</th>
              <th className="border border-gray-300 p-2">SEE Marks</th>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Remarks</th>
              <th className="border border-gray-300 p-2">Credits</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((course) => {
              const report = reports.find((rep) => rep.CourseId === course.CourseId);
              return (
                <tr key={course.CourseId} className="text-center">
                  <td className="border border-gray-300 p-2">{course.Name}</td>
                  <td className="border border-gray-300 p-2">{course.CourseCode}</td>
                  <td className="border border-gray-300 p-2">
                    {report ? report.CIEMarks : 'N/A'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {report ? report.SEEMarks : 'N/A'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {report ? report.Grade : 'N/A'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {report ? report.Remark : 'N/A'}
                  </td>
                  <td className="border border-gray-300 p-2">{course.Credits}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-200">
              <td className="border border-gray-300 p-2 text-right" colSpan={6}>
                CGPA:
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {calculateCGPA()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Generate;
