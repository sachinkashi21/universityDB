import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TeacherClass = () => {
    const { classId, courseId } = useParams();
    const [classData, setClassData] = useState({ Branch: "", ClassId: "", Degree: "", EndDate: "", StartDate: "", Sem: "" });
    const [courseData, setCourseData] = useState({});
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

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/class/${classId}`);
            // console.log(response.data);
            setClassData({ ...response.data });
            const response2 = await axios.get(`http://localhost:8080/course/single/${courseId}`);
            // console.log(response2.data);
            setCourseData({ ...response2.data });
        }
        fetchData();
    }, [classId, courseId])

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-[#333E48]">
                {/* Class Info */}
                <div className="bg-[#F7F9FB] p-6 rounded-2xl shadow-md">
                    <p className="mb-2"><strong>Branch:</strong> {classData.Branch}</p>
                    <p className="mb-2"><strong>Degree:</strong> {classData.Degree}</p>
                    <p className="mb-2"><strong>Semester:</strong> {classData.Sem}</p>
                    <p className="mb-2">
                        <strong>Start Date:</strong> {classData.StartDate ? new Date(classData.StartDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>End Date:</strong> {classData.EndDate ? new Date(classData.EndDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
                    </p>
                </div>

                {/* Course Info */}
                <div className="bg-[#F7F9FB] p-6 rounded-2xl shadow-md">
                    <p className="mb-2"><strong>Course Code:</strong> {courseData.CourseCode}</p>
                    <p className="mb-2"><strong>Title:</strong> {courseData.Name}</p>
                    <p className="mb-2"><strong>Credits:</strong> {courseData.Credits}</p>
                    <p className="mb-2"><strong>Department:</strong> {courseData.DeptName}</p>
                </div>
            </div>

            <hr className="border-t-2 border-[#F5C32C]" />



            {/* Lectures Section */}
            <h2 className="text-2xl font-semibold text-[#1B3A57] mb-6">All Lectures</h2>

            <div className="overflow-x-auto rounded-2xl shadow-md">
                <table className="min-w-full bg-white border border-[#F5C32C] rounded-2xl text-[#333E48]">
                    <thead className="bg-[#F7F9FB] text-left text-[#1B3A57]">
                        <tr>
                            <th className="py-3 px-4 border-b border-[#F5C32C]">Topic</th>
                            <th className="py-3 px-4 border-b border-[#F5C32C]">Date</th>
                            <th className="py-3 px-4 border-b border-[#F5C32C]">Time</th>
                            <th className="py-3 px-4 border-b border-[#F5C32C]">Duration</th>
                            <th className="py-3 px-4 border-b border-[#F5C32C]">Room No</th>
                            <th className="py-3 px-4 border-b border-[#F5C32C]">Meeting</th>
                            {user1 && user1.role !== "Student" && user1.userId === data.teacherId && (
                                <th className="py-3 px-4 border-b border-[#F5C32C]">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.lectures.map((lecture, index) => {
                            const lectureDate = new Date(lecture.Date);
                            const displayDate = lectureDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            });

                            return (
                                <tr
                                    key={lecture.LectureId}
                                    className={index % 2 === 0 ? "bg-white" : "bg-[#F7F9FB]"}
                                >
                                    <td className="py-3 px-4">{lecture.Topic}</td>
                                    <td className="py-3 px-4">{displayDate}</td>
                                    <td className="py-3 px-4">{lecture.Time}</td>
                                    <td className="py-3 px-4">{lecture.Duration} mins</td>
                                    <td className="py-3 px-4">{lecture.RoomNo || "N/A"}</td>
                                    <td className="py-3 px-4">
                                        {lecture.MeetLink ? (
                                            <a
                                                href={lecture.MeetLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#D72638] underline hover:text-[#C02031]"
                                            >
                                                Join
                                            </a>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    {user1 && user1.role !== "Student" && user1.userId === data.teacherId && (
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() =>
                                                    navigate(`/lecture/${lecture.LectureId}/${classId}`)
                                                }
                                                className="bg-[#D72638] hover:bg-[#C02031] text-white py-1 px-3 rounded-lg transition"
                                            >
                                                Take Attendance
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {
                user1 && user1.userId === data.teacherId &&
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
                user1 && user1.userId === data.teacherId &&
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
                user1 && user1.userId === data.teacherId &&
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
