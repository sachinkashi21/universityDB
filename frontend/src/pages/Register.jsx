import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [data, setData] = useState({
    fname: "", minit: "", lname: "", role: "Teacher", phone: "", dob: "", email: ""
  });

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    let res= await axios.post('http://localhost:8080/user/register', {
      data:{...data,password:data.dob},
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    });
    console.log(res.data);
    if(res.data.error){
      toast.error(res.data.error);  
    }
    else{
      toast.success("User registered successfully");
      setData({
        fname: "", minit: "", lname: "", role: "Teacher", phone: "", email: "",dob:""
      });
    }
  };

  let handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="mt-20 flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-indigo-800 text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold">Full Name</label>
            <div className="flex gap-2 mt-1">
              <input name="fname" placeholder="First" className="border border-gray-300 p-2 w-1/3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.fname} />
              <input name="minit" placeholder="Middle" className="border border-gray-300 p-2 w-1/3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.minit} />
              <input name="lname" placeholder="Last" className="border border-gray-300 p-2 w-1/3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.lname} />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-indigo-900 font-semibold">Role</label>
            <select id="role" name="role" className="border border-gray-300 p-2 w-full mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.role}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-indigo-900 font-semibold">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter email" className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.email} />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold" htmlFor='phone'>Phone</label>
            <input name="phone" placeholder="Enter phone number" className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.phone} />
          </div>

          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold">Date of Birth</label>
            <input type="date" name="dob" className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.dob} />
          </div>

          <button type="submit" className="block bg-orange-600 hover:bg-orange-700 text-white p-3 w-full rounded-lg text-xl font-semibold transition-all duration-300">Register</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
