import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudents = () => {
    const [students,setStudents]=useState([]);
    const [selectedStu,setSelectedStu]=useState([]);
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                let res=await axios.get(`http://localhost:8080/student?exceptClass=${id}`);
                setStudents(res.data.students);
            } catch(err){
                toast.error(err.message);
            }
        }
        fetchData();

    },[])
    const handleOnSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`http://localhost:8080/class/${id}/addStudents`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data:{
                    students:selectedStu
                }
            })
            console.log(res);
            if(res.data.error){
                toast.error(res.data.error);
            } else{
                navigate(`/class/${id}`);
            }
        } catch(err){
            toast.error(err.message);
            console.log(err);
        }
    }

    const handleOnChange = (userId) => {
        setSelectedStu((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((s) => s !== userId) // Remove if already selected
                : [...prevSelected, userId] // Add if not selected
        );
    };
  return (
    <>
        <ToastContainer />
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-indigo-900 text-center mb-6">
            Add Students to class id: {id}
        </h1>
        <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
                <label
                    htmlFor="selectedStudents"
                    className="block text-lg font-medium text-gray-700"
                >
                    Select Students
                </label>
                <div className="mt-2 space-y-3">
                    {students.map((s) => (
                        <div
                            key={s.UserId}
                            className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-100 transition"
                        >
                            <input
                                type="checkbox"
                                id={s.UserId}
                                checked={selectedStu.includes(s.UserId)}
                                onChange={() => handleOnChange(s.UserId)}
                                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label
                                htmlFor={s.UserId}
                                className="text-gray-800 text-lg cursor-pointer"
                            >
                                {s.FName} {s.MInit} {s.LName}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
                Add Students
            </button>
        </form>
    </div> 
    </>
  )
}

export default AddStudents