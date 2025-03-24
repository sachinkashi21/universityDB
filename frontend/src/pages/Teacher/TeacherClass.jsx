import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TeacherClass = () => {
    const { classId, courseId } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    const [data, setData] = useState({
        students: [],
        lectures: [],
        attendance: [],
        assignments: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/teacher/${userId}/${classId}/${courseId}`
                );
                console.log(response.data)
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, classId, courseId]);

    if (loading) return <div className="text-center mt-10 text-indigo-600">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    const calculateAttendance = (studentId) => {
        const totalLectures = data.lectures.length || 1;
        const attendedLectures = data.attendance
            .filter((record) => record.UserId === studentId)
            .reduce((sum, record) => {
                if (record.Status === "Present") return sum + 1;
                if (record.Status === "Partial") return sum + 0.5;
                return sum;
            }, 0);

        const percentage = ((attendedLectures / totalLectures) * 100).toFixed(2);
        return { attendedLectures, percentage };
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">ClassId: {classId} | CourseId: {courseId} | TeacherId: {userId}</h2>
            <hr />
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">All Lectures</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {data.lectures.map((lecture) => {
                    const lectureDateObj = new Date(lecture.Date);
                    const year = lectureDateObj.getFullYear();
                    const month = lectureDateObj.getMonth(); // zero-based month
                    const day = lectureDateObj.getDate();

                    const timeParts = lecture.Time.split(":");
                    const hours = Number(timeParts[0]);
                    const minutes = Number(timeParts[1]);
                    const seconds = timeParts.length === 3 ? Number(timeParts[2]) : 0;

                    const lectureDateTime = new Date(year, month, day, hours, minutes, seconds);
                    const currentDateTime = new Date();
                    const isPastLecture = lectureDateTime < currentDateTime;

                    const displayDate = lectureDateObj.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    return (
                        <div
                            key={lecture.LectureId}
                            className={`border rounded-2xl shadow-lg p-6 transition duration-300 ${isPastLecture
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-white hover:shadow-xl"
                                }`}
                        >
                            <h3 className="text-xl font-semibold text-indigo-800 mb-2">{lecture.Topic}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Date:</strong> {displayDate}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Time:</strong> {lecture.Time}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Duration:</strong> {lecture.Duration} mins
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>Room No:</strong> {lecture.RoomNo || "N/A"}
                            </p>
                            {lecture.MeetLink && (
                                <p className="text-sm mb-3">
                                    <a
                                        href={lecture.MeetLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`underline ${isPastLecture
                                                ? "text-gray-400 pointer-events-none"
                                                : "text-indigo-600 hover:text-indigo-800"
                                            }`}
                                    >
                                        Join Meeting
                                    </a>
                                </p>
                            )}
                            {user && user.role !== "Student" && (
                                <button
                                    onClick={() => !isPastLecture && navigate(`/lecture/${lecture.LectureId}/${classId}`)}
                                    className={`w-full py-2 px-4 rounded-lg text-center ${isPastLecture
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                                        }`}
                                    disabled={isPastLecture}
                                >
                                    Take Attendance
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
                <button
                    onClick={() => navigate(`/lecture/new/${classId}/${courseId}`)}
                    className={`py-2 px-4 m-4 rounded-lg text-center bg-indigo-600 text-white hover:bg-indigo-700`}
                >
                    Schedule Lecture
                </button>

            <hr />    
            {/* Assignments */}
            <div className="mb-10">
                <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Assignments</h2>
                <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.assignments.map((assignment, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition`}
                            >
                                <td className="py-3 px-6">{assignment.Title}</td>
                                <td className="py-3 px-6">{assignment.Description}</td>
                                <td className="py-3 px-6">{assignment.Deadline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <hr />
            {/* Students */}
            <div className="mb-10">
                <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Students</h2>
                <button
                    onClick={()=>{navigate(`/report/${classId}/${courseId}`)}}
                    className={`py-2 px-4 m-3 rounded-lg text-center bg-indigo-600 text-white hover:bg-indigo-700`}
                >
                    Update Marks
                </button>
                <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Attendance (%)</th>
                            <th className="py-3 px-6">Classes Attended</th>
                            <th className="py-3 px-6">Total Classes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.students.map((student) => {
                            const { attendedLectures, percentage } = calculateAttendance(student.UserId);
                            return (
                                <tr key={student.UserId} className="hover:bg-gray-100 transition">
                                    <td className="py-3 px-6">{`${student.FName} ${student.LName}`}</td>
                                    <td className="py-3 px-6">{student.Email}</td>
                                    <td className="py-3 px-6">{percentage}%</td>
                                    <td className="py-3 px-6">{attendedLectures}</td>
                                    <td className="py-3 px-6">{data.lectures.length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherClass;
