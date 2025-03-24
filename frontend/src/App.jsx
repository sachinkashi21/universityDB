import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'

import Navbar from "./components/Navbar";

import Layout from './layouts/Layout';

import Home from "./pages/Home";
import Login from './pages/User/Login';
import Register from "./pages/User/Register";

import ClassIndex from "./pages/Class/Index";
import ClassNew from "./pages/Class/New";
import ClassShow from "./pages/Class/Show";
import AddCourse from './pages/Class/AddCourse';
import AddStudents from './pages/Class/AddStudents';

import CourseIndex from "./pages/Course/Index";
import CourseNew from "./pages/Course/New";

import TeacherClass from './pages/Teacher/TeacherClass';
import TeacherDashboard from './pages/Teacher/Dashboard';

import NewLecture from './pages/Lecture/New'
import LectureAttendance from './pages/Lecture/Attedance'
import AddMarks from './pages/Report/AddMarks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/user" element={<Layout />}>
          <Route path='login' element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route path='register' element={<Register />} />
        </Route>

        <Route path="/class" element={<Layout />}>
          <Route index element={<ClassIndex />}></Route>
          <Route path='new' element={<ClassNew />}></Route>
          <Route path=':id' element={<ClassShow />}></Route>
          <Route path=':id/addcourse' element={<AddCourse />}></Route>
          <Route path=':id/addStudents' element={<AddStudents />}></Route>
        </Route>

        <Route path="/course" element={<Layout />}>
          <Route index element={<CourseIndex />}></Route>
          <Route path='new' element={<CourseNew />}></Route>
        </Route>

        <Route path="/teacher" element={<Layout />}>
          <Route path='dashboard' element={<TeacherDashboard/>}></Route>
          <Route path=':classId/:courseId' element={<TeacherClass />}></Route>
        </Route>
        
        <Route path="/lecture" element={<Layout />}>
          <Route path=':lectId/:classId' element={<LectureAttendance />}></Route>
          <Route path='new/:classId/:courseId' element={<NewLecture />}></Route>
        </Route>

        <Route path='/report' element={<Layout/>}>
          <Route path=':classId/:courseId' element={<AddMarks/>}></Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
