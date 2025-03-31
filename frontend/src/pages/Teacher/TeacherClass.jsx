import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TeacherClass = () => {
    const { classId, courseId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        students: [],
        lectures: [],
        attendance: [],
        assignments: [],
        teacherId: null,
    });

    const [user1, setUser1] = useState();
      useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
          navigate("/user/login");
        } else {
          const usr = JSON.parse(userData);
            // console.log(usr);
          setUser1(usr);
        }
      }, [navigate]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/teacher/123/${classId}/${courseId}`
                );
                // console.log(response.data);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
                console.log(err);
            }
        };

        fetchData();
    }, [classId, courseId]);

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
        <div className="p-8 bg-white shadow-md rounded-2xl">
            <h2 className="text-3xl font-bold text-[#1B3A57] mb-6">Class ID: {classId} | Course ID: {courseId} | Teacher ID: {data.teacherId}</h2>
            <hr className="mb-6 border-t-2 border-[#F5C32C]" />

            {/* Lectures Section */}
            <h2 className="text-2xl font-semibold text-[#1B3A57] mb-6">All Lectures</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.lectures.map((lecture) => {
                    const lectureDate = new Date(lecture.Date);
                    const displayDate = lectureDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    return (
                        <div
                            key={lecture.LectureId}
                            className={`p-6 border rounded-2xl shadow-md transition duration-300 bg-white hover:shadow-lg`}
                        >
                            <h3 className="text-lg font-semibold text-[#1B3A57] mb-2">{lecture.Topic}</h3>
                            <p className="text-sm text-[#333E48] mb-1"><strong>Date:</strong> {displayDate}</p>
                            <p className="text-sm text-[#333E48] mb-1"><strong>Time:</strong> {lecture.Time}</p>
                            <p className="text-sm text-[#333E48] mb-1"><strong>Duration:</strong> {lecture.Duration} mins</p>
                            <p className="text-sm text-[#333E48] mb-3"><strong>Room No:</strong> {lecture.RoomNo || "N/A"}</p>
                            {lecture.MeetLink && (
                                <a
                                    href={lecture.MeetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline text-[#D72638] hover:text-[#C02031]`}
                                >
                                    Join Meeting
                                </a>
                            )}
                            {user1 && user1.role!=="Student" && user1.userId===data.teacherId &&(
                                <button
                                    onClick={() =>navigate(`/lecture/${lecture.LectureId}/${classId}`)}
                                    className={`w-full py-2 px-4 mt-4 rounded-lg text-center transition duration-300 bg-[#D72638] text-white hover:bg-[#C02031]`}
                                >
                                    Take Attendance
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            {
                user1 && user1.userId===data.teacherId &&
                <button
                onClick={() => navigate(`/lecture/new/${classId}/${courseId}`)}
                className="mt-6 py-2 px-6 rounded-lg bg-[#D72638] text-white hover:bg-[#C02031] transition duration-300"
                >
                Schedule Lecture
            </button>
            }

            <hr className="my-10 border-t-2 border-[#F5C32C]" />

            {/* Assignments Section */}
            <h2 className="text-2xl font-semibold text-[#1B3A57] mb-6">Assignments</h2>
            <table className="min-w-full bg-white border rounded-2xl shadow">
                <thead className="bg-[#1B3A57] text-white">
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
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                        >
                            <td className="py-3 px-6">{assignment.Title}</td>
                            <td className="py-3 px-6">{assignment.Description}</td>
                            <td className="py-3 px-6">
                            {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }).format(new Date(assignment.Deadline))}
                            <span className="text-gray-500 text-sm ml-2">
                                ({Math.max(0, Math.ceil((new Date(assignment.Deadline) - new Date()) / (1000 * 60 * 60 * 24)))} days left)
                            </span>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {
                user1 && user1.userId===data.teacherId &&
                <button
                onClick={() => navigate(`/assignment/new/${classId}/${courseId}`)}
                className="mt-6 py-2 px-6 rounded-lg bg-[#D72638] text-white hover:bg-[#C02031] transition duration-300"
                >
                New Assignment
            </button>
            }

            <hr className="my-10 border-t-2 border-[#F5C32C]" />

            {/* Students Section */}
            <h2 className="text-2xl font-semibold text-[#1B3A57] mb-6">Students</h2>
            {
                user1 && user1.userId===data.teacherId &&
            <button
                onClick={() => navigate(`/report/${classId}/${courseId}`)}
                className="py-2 px-6 mb-4 rounded-lg bg-[#D72638] text-white hover:bg-[#C02031] transition duration-300"
            >
                Update Marks
            </button>
            }
            <table className="min-w-full bg-white border rounded-2xl shadow">
                <thead className="bg-[#1B3A57] text-white">
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
                            <tr
                                key={student.UserId}
                                className="hover:bg-gray-100 transition cursor-pointer"
                                onClick={() => navigate(`/student/dashboard/${student.UserId}`)}
                            >
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
    );
};

export default TeacherClass;
