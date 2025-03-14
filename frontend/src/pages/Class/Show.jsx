import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Show = () => {
    const [cls, setCls] = useState();
    const { id } = useParams();
    const navigate=useNavigate();

    const handleAddCourse = () => {
        navigate(`/class/${id}/addcourse`); 
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`http://localhost:8080/class/${id}`);
                setCls(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <h1 className="text-4xl font-extrabold text-indigo-900 text-center mb-8">Class</h1>
            {cls && (
                <div key={cls.ClassId}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-2">
                        <h2 className="text-2xl font-bold text-indigo-900">{cls.Branch} - Sem {cls.Sem}</h2>
                        <p className="text-gray-700 mt-2">Degree: <span className="font-medium">{cls.Degree}</span></p>
                        <p className="text-gray-700">Start Date: <span className="font-medium">{new Date(cls.StartDate).toLocaleDateString()}</span></p>
                        <p className="text-gray-700">End Date: <span className="font-medium">{new Date(cls.EndDate).toLocaleDateString()}</span></p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-2">
                        <h1 className="text-xl text-indigo-900">Courses:</h1>
                        {cls.Courses.map((course) => (
                            <div className="bg-white p-6 rounded-2xl shadow-lg mt-4" key={course.CourseCode}>
                                <div className="">
                                    <h2 className="text-2xl font-bold text-indigo-900">{course.Name}</h2>
                                    <p className="text-gray-700 mt-2"><span className="font-medium">Course Code: {course.CourseCode}</span></p>
                                    <p className="text-gray-700"><span className="font-medium">Teacher: {course.FName} {course.MInit} {course.LName}</span></p>
                                </div>
                            </div>
                        ))}
                        <div className="pt-5">
                            <div className="flex justify-end">
                            <button onClick={()=>handleAddCourse()} type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Add
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-2">
                        <h1 className="text-xl text-indigo-900">Students:</h1>
                        <ol>
                            {cls.Students.map((student) => (
                                <li key={student.UserId}>
                                    <p className="text-gray-700 mt-2"><span className="font-medium">{student.FName} {student.MInit} {student.LName}</span></p>
                                </li>
                            ))}
                        </ol>
                        <div className="pt-5">
                            <div className="flex justify-end">
                            <button onClick={(e)=>{navigate(`/class/${id}/addStudents`)}} type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Add
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Show