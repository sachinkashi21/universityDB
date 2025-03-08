import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:8080/class');
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 to-indigo-300 p-8">
            <h1 className="text-4xl font-extrabold text-indigo-900 text-center mb-8">Classes</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {classes.map((cls) => (
                    <div key={cls.ClassId} className="bg-white p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105" onClick={() => navigate(`/class/${cls.ClassId}`)}>
                        <h2 className="text-2xl font-bold text-indigo-900">{cls.Branch} - Sem {cls.Sem}</h2>
                        <p className="text-gray-700 mt-2">Degree: <span className="font-medium">{cls.Degree}</span></p>
                        <p className="text-gray-700">Start Date: <span className="font-medium">{new Date(cls.StartDate).toLocaleDateString()}</span></p>
                        <p className="text-gray-700">End Date: <span className="font-medium">{new Date(cls.EndDate).toLocaleDateString()}</span></p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate("/class/new")}
                className="mt-8 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg text-xl font-semibold transition-all duration-300"
            >
                Add Class
            </button>
        </div>
    );
};

export default Index;
