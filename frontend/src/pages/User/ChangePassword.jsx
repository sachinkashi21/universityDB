import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // lucide-react icons
import axios from "axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleToggle = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/change-password", formData); // Replace with your backend endpoint
      toast.success(response.data.message || "Password changed successfully!");
    } catch (error) {
      toast.error("Error changing password.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-[#1B3A57] mb-6 border-b pb-2 border-[#F5C32C]">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-[#1B3A57] font-medium mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#333E48] rounded-md bg-white focus:border-[#1B3A57] focus:outline-none"
              placeholder="Enter current password"
            />
            <span
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => handleToggle("current")}
            >
              {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-[#1B3A57] font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#333E48] rounded-md bg-white focus:border-[#1B3A57] focus:outline-none"
              placeholder="Enter new password"
            />
            <span
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => handleToggle("new")}
            >
              {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[#1B3A57] font-medium mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#333E48] rounded-md bg-white focus:border-[#1B3A57] focus:outline-none"
              placeholder="Confirm new password"
            />
            <span
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => handleToggle("confirm")}
            >
              {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 rounded-lg text-white bg-[#D72638] hover:bg-[#C02031] transition duration-300"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
