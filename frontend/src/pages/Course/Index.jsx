import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    
    const [user, setUser] = useState();
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            navigate("/user/login");
        } else {
            const usr = JSON.parse(userData);
            //   console.log(usr);
            setUser(usr);
        }
    }, [navigate]);

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
        <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center py-8">
            <h1 className="text-4xl font-extrabold text-[#1B3A57] text-center mb-8">Courses</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {courses.map((c) => (
                    <div key={c.CourseCode} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
                        <h2 className="text-2xl font-bold text-[#1B3A57]">{c.Name}</h2>
                        <p className="text-[#333E48] mt-2">Credits: <span className="font-medium">{c.Credits}</span></p>
                        <p className="text-[#333E48]">Course Code: <span className="font-medium">{c.CourseCode}</span></p>
                        <p className="text-[#333E48]">Department: <span className="font-medium">{c.DeptName}</span></p>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <p className="text-center text-lg text-[#333E48] mt-8">No courses available.</p>
            )}
            {
                user && user.role==="Admin" &&
                (<button onClick={() => navigate("/course/new")} className="mt-8 bg-[#D72638] hover:bg-[#C02031] text-white py-3 px-6 rounded-lg text-xl font-semibold transition-all duration-300"
                >Add Course
                </button>)
            }
        </div>
    );
};

export default Index;
