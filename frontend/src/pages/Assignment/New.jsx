import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewAssignment = () => {
  const { classId, courseId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    givenOn: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.givenOn || !formData.deadline) {
      toast.error("Please fill in all required fields.");
      return;
    }
    await axios.post("http://localhost:8080/assignment/new",{
        header: `Bearer ${localStorage.getItem('token')}`,
        data: {...formData, classId,courseId}
    })
    toast.success("Assignment added successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold text-[#1B3A57] mb-6">New Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#333E48] font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-[#F7F9FB]"
            required
          />
        </div>
        <div>
          <label className="block text-[#333E48] font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-[#F7F9FB]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#333E48] font-medium">Given On *</label>
            <input
              type="date"
              name="givenOn"
              value={formData.givenOn}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-[#F7F9FB]"
              required
            />
          </div>
          <div>
            <label className="block text-[#333E48] font-medium">Deadline *</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-[#F7F9FB]"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#D72638] text-white p-3 rounded-lg font-bold hover:bg-[#B71C2A] transition"
        >
          Add Assignment
        </button>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default NewAssignment;
