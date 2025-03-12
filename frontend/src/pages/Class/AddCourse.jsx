import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {
    const [data, setData] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/course?excludeClass=${id}`);
                if (res.data.error) {
                    toast.error(res.data.error);
                } else {
                    setData(res.data);
                }
            } catch (error) {
                toast.error("Failed to fetch courses");
            }
        };

        const fetchData2 = async () => {
            try {
                const res = await axios.get("http://localhost:8080/teacher");
                if (res.data.error) {
                    toast.error(res.data.error);
                } else {
                    setTeacher(res.data);
                }
            } catch (error) {
                toast.error("Failed to fetch teachers");
            }
        };

        fetchData();
        fetchData2();
    }, [id]);

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const handleTeacherChange = (e) => {
        setSelectedTeacher(e.target.value);
    };

    const submitSelectedCourses = async () => {
        if (!selectedCourse || !selectedTeacher) {
            toast.error("Please select both a course and a teacher.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:8080/class/${id}/addcourse`, {
                data:{
                    courseCode: selectedCourse,
                    teacherId: selectedTeacher
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                toast.success("Course added successfully");
                navigate(`/class/${id}`);
            }
        } catch (error) {
            toast.error("Failed to add course");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
                <h1 className="text-3xl font-bold text-indigo-900 text-center mb-6">Add Course to Class ID: {id}</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="selectedCourse" className="block text-lg font-medium text-gray-700">Select Course</label>
                        <select
                            id="selectedCourse"
                            className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handleCourseChange}
                            value={selectedCourse}
                        >
                            <option value="">-- Select a Course --</option>
                            {data.map((course) => (
                                <option key={course.CourseCode} value={course.CourseCode}>{course.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="selectedTeacher" className="block text-lg font-medium text-gray-700">Allot Teacher</label>
                        <select
                            id="selectedTeacher"
                            className="mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handleTeacherChange}
                            value={selectedTeacher}
                        >
                            <option value="">-- Select a Teacher --</option>
                            {teacher.map((t) => (
                                <option key={t.UserId} value={t.UserId}>{t.FName} {t.LName}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={submitSelectedCourses}
                        className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddCourse;
