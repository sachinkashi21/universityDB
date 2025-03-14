import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

const New = () => {
  const [data,setData]=useState({CourseCode:"",Credits:"",Name:"",DeptName:""});
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const res=await axios.post("http://localhost:8080/course/new",{
      data, 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    if(res.data.error){
      toast.error(res.data.error);  
    } else{
      toast.success("Course created successfully with id "+res.data.classId);
      setData({
        Name:"",CourseCode:"",DeptName:"",Credits:""
      });
    }
  }
  const handleChange=(e)=>{
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }
  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-extrabold text-indigo-900 text-center mb-8">New Course</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Course Information</h3>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:col-span-6">
                  <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Name"
                      id="Name"
                      autoComplete="Name"
                      required
                      className="block w-full h-10 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      onChange={handleChange}
                      value={data.Name}
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="CourseCode" className="block text-sm font-medium text-gray-700">
                    CourseCode
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="CourseCode"
                      id="CourseCode"
                      autoComplete="CourseCode"
                      required
                      className="block w-full h-10 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      onChange={handleChange}
                      value={data.CourseCode}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="DeptName" className="block text-sm font-medium text-gray-700">
                    DeptName
                  </label>
                  <div className="mt-1">
                    <input
                      type="tesxt"
                      name="DeptName"
                      id="DeptName"
                      autoComplete="DeptName"
                      required
                      className="block w-full h-10 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      onChange={handleChange}
                      value={data.DeptName}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="Credits" className="block text-sm font-medium text-gray-700">
                    Credits
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="Credits"
                      id="Credits"
                      autoComplete="Credits"
                      required
                      className="block w-full h-10 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      onChange={handleChange}
                      value={data.Credits}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default New