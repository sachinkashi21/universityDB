import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:8080/course');
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 to-indigo-300 p-8">
            <h1 className="text-4xl font-extrabold text-indigo-900 text-center mb-8">Courses</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {courses.map((c) => (
                    <div key={c.CourseCode} className="bg-white p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105" >
                        <h2 className="text-2xl font-bold text-indigo-900">{c.Name}</h2>
                        <p className="text-gray-700 mt-2">Credits: <span className="font-medium">{c.Credits}</span></p>
                        <p className="text-gray-700 mt-2">Course Code: <span className="font-medium">{c.CourseCode}</span></p>
                        <p className="text-gray-700">Department: <span className="font-medium">{c.DeptName}</span></p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate("/course/new")}
                className="mt-8 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg text-xl font-semibold transition-all duration-300"
            >
                Add Course
            </button>
        </div>
    );
};

export default Index;
