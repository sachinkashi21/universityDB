import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [classData, setClassData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/student/dashboard/${id}`);
                // console.log(res.data.student[0]);
                if (res.data.student.length === 0) {
                    toast.error("No such student exists");
                } else {
                    setData(res.data.student[0]);
                }
            } catch (error) {
                toast.error('Failed to fetch student data');
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (data && data.CurrentClassId) {
            const fetchClassData = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/class/${data.CurrentClassId}`);
                    console.log(res.data);
                    setClassData(res.data);
                } catch (error) {
                    toast.error('Failed to fetch class data');
                }
            };
            fetchClassData();
        }
    }, [data]);

    if (!data) {
        return <div className="text-center mt-10 text-xl font-semibold">Loading Student Details...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-[#1B3A57] text-white p-6 flex flex-col items-center">
                <FaUserCircle className="text-6xl mb-4" />
                <h2 className="text-xl font-bold">{data.FName} {data.LName}</h2>
                <p className="text-sm text-gray-300">{data.Email}</p>
                <button
                    onClick={() => navigate(`/report/generate/${id}/${data.CurrentClassId}`)}
                    className="mt-6 py-2 px-4 w-full rounded-lg bg-[#D72638] text-white hover:bg-[#C02031]"
                >
                    Generate Report
                </button>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-8">
                <ToastContainer />
                <h1 className="text-2xl font-bold text-[#1B3A57] mb-6">Student Dashboard</h1>
                <div className="grid grid-cols-12 gap-6">
                    {/* Student Details Card */}
                    <div className="col-span-6 bg-white shadow-md rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="text-gray-700 space-y-2">
                            <p><strong>Phone:</strong> {data.Phone}</p>
                            <p><strong>Date of Birth:</strong> {new Date(data.DOB).toLocaleDateString()}</p>
                            <p><strong>City:</strong> {data.City}</p>
                            <p><strong>State:</strong> {data.State}</p>
                            <p><strong>Pincode:</strong> {data.PinCode}</p>
                            <p><strong>Role:</strong> {data.Role}</p>
                        </div>
                    </div>

                    {/* Class Information Card */}
                    {classData && (
                        <div onClick={()=>{navigate(`/class/${classData.ClassId}`)}} className="col-span-6 bg-white shadow-md rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Class Details</h2>
                            <div className="text-gray-700 space-y-2">
                                <p><strong>Degree:</strong> {classData.Degree}</p>
                                <p><strong>Semester:</strong> {classData.Sem}</p>
                                <p><strong>Branch:</strong> {classData.Branch}</p>
                                <p>
                                    <strong>Class Timeline:</strong> {new Date(classData.StartDate).toLocaleDateString()} - {new Date(classData.EndDate).toLocaleDateString()} 
                                    &nbsp;({new Date(classData.EndDate).getFullYear() - new Date(classData.StartDate).getFullYear()} years)
                                </p>

                            </div>
                        </div>
                    )}
                </div>

                {/* Courses Section */}
                {classData?.Courses?.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
                        <div className="grid grid-cols-12 gap-6">
                            {classData.Courses.map((course) => (
                                <div key={course.CourseCode} className="col-span-4 bg-[#F7F9FB] rounded-lg p-4 shadow">
                                    <h3 className="font-bold text-[#1B3A57]">{course.Name}</h3>
                                    <p><strong>Code:</strong> {course.CourseCode}</p>
                                    <p><strong>Credits:</strong> {course.Credits}</p>
                                    <div className="mt-2">
                                        <h4 className="font-semibold">Assigned Teacher:</h4>
                                        <p>{course.FName} {course.LName || ''}</p>
                                        <p className="text-sm text-gray-600">{course.Email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;