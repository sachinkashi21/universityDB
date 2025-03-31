import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStu, setSelectedStu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/student?exceptClass=${id}`);
        
        if (res.data.students && res.data.students.length > 0) {
          setStudents(res.data.students);
        } else {
          toast.info("No students available to add.");
        }
      } catch (err) {
        toast.error("Failed to fetch students.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [id]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (selectedStu.length === 0) {
      toast.error("Please select at least one student.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/class/${id}/addStudents`,
        {
          students: selectedStu,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Students added successfully!");
        navigate(`/class/${id}`);
      }
    } catch (err) {
      toast.error("Failed to add students.");
    }
  };

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
          Add Students to Class ID: {id}
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading students...</p>
        ) : (
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
              <label
                htmlFor="selectedStudents"
                className="block text-lg font-medium text-gray-700"
              >
                Select Students
              </label>
              {students.length === 0 ? (
                <p className="mt-3 text-gray-500">No students available to add.</p>
              ) : (
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
              )}
            </div>

            <button
              type="submit"
              disabled={selectedStu.length === 0}
              className={`w-full py-2 px-4 font-semibold rounded-lg transition ${
                selectedStu.length > 0
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Add Students
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AddStudents;
