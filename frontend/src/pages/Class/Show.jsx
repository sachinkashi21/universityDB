import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Show = () => {
    const [cls, setCls] = useState();
    const { id } = useParams();

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
            <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-900">{cls.Branch} - Sem {cls.Sem}</h2>
            <p className="text-gray-700 mt-2">Degree: <span className="font-medium">{cls.Degree}</span></p>
            <p className="text-gray-700">Start Date: <span className="font-medium">{new Date(cls.StartDate).toLocaleDateString()}</span></p>
            <p className="text-gray-700">End Date: <span className="font-medium">{new Date(cls.EndDate).toLocaleDateString()}</span></p>

            {cls.Students.map((student) => (
                <div className="bg-white p-6 rounded-2xl shadow-lg mt-4" key={student.UserId}>
                    <h2 className="text-2xl font-bold text-indigo-900">{student.Name}</h2>
                    <p className="text-gray-700 mt-2"><span className="font-medium">{student.FName} {student.MInit} {student.LName}</span></p>
                    {/* <p className="text-gray-700">Phone: <span className="font-medium">{student.Phone}</span></p> */}
                    {/* <p className="text-gray-700">DOB: <span className="font-medium">{new Date(student.DOB).toLocaleDateString()}</span></p> */}
                </div>
            ))}
            </div>
        )}
    </div>  
  )
}

export default Show