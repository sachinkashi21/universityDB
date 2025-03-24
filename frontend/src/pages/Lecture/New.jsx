import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const New = () => {
  const { classId, courseId } = useParams(); // Get classId and courseId from URL
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    time: "",
    duration: "",
    roomNo: "",
    meetLink: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API request to create a lecture
      const response = await axios.post(
        `http://localhost:8080/lecture/${classId}/${courseId}`,
        formData
      );

      // Success response
      if(response.data.error){
        toast.error(response.data.error);
      } else{
        toast.success(response.data);
        navigate(`/teacher/${classId}/${courseId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
        <ToastContainer/>
      <h2 className="text-xl font-bold mb-4">Create a Lecture</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block font-semibold">Topic:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter lecture topic"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Duration (in minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter duration"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Room Number:</label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter room number"
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Meeting Link:</label>
          <input
            type="url"
            name="meetLink"
            value={formData.meetLink}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter meeting link (if any)"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Create Lecture
        </button>
      </form>
    </div>
  );
};

export default New;
