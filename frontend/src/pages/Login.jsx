import React, {useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({
    email: "", password: ""
  });

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    let res = await axios.post('http://localhost:8080/user/login', data);
    console.log(res.data);
    if (res.data.error) {
      toast.error(res.data.error);
    } else {
      toast.success("User logged in successfully");
      setData({
        email: "", password: ""
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
        <h2 className="text-4xl font-extrabold text-indigo-800 text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold" htmlFor='email'>Email</label>
            <input type="email" id="email" name="email" placeholder="Email" className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.email}/>
          </div>
          <div className="mb-4">
            <label className="block text-indigo-900 font-semibold" htmlFor='password'>Password</label>
            <input type="password" id="password" name="password" placeholder="Password" className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={data.password}/>
          </div>
          <div className='mb-2'>
            <a href="/user/changePass" className="mb-5 text-indigo-700 hover:underline">Change Password</a>
          </div>
          <button type="submit" className="block bg-orange-600 hover:bg-orange-700 text-white p-3 w-full rounded-lg text-xl font-semibold transition-all duration-300">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login