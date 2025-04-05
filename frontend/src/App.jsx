import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';

// Lazy load components
const Layout = lazy(() => import('./layouts/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/User/Login'));
const Register = lazy(() => import('./pages/User/Register'));
const ChangePassword = lazy(() => import('./pages/User/ChangePassword'));

const ClassIndex = lazy(() => import('./pages/Class/Index'));
const ClassNew = lazy(() => import('./pages/Class/New'));
const ClassShow = lazy(() => import('./pages/Class/Show'));
const AddCourse = lazy(() => import('./pages/Class/AddCourse'));
const AddStudents = lazy(() => import('./pages/Class/AddStudents'));

const CourseIndex = lazy(() => import('./pages/Course/Index'));
const CourseNew = lazy(() => import('./pages/Course/New'));

const Classroom = lazy(() => import('./pages/Teacher/TeacherClass'));
const TeacherDashboard = lazy(() => import('./pages/Teacher/Dashboard'));

const NewLecture = lazy(() => import('./pages/Lecture/New'));
const LectureAttendance = lazy(() => import('./pages/Lecture/Attedance'));

const AddMarks = lazy(() => import('./pages/Report/AddMarks'));
const Generate = lazy(() => import('./pages/Report/Generate'));

const StudentDashboard = lazy(() => import('./pages/Student/Dashboard'));

const NewAssignment= lazy(() => import('./pages/Assignment/New'));

// Fallback component for lazy loading
const Loading = () => <div className="text-center py-10">Loading...</div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* User Routes */}
          <Route path="/user" element={<Layout />}>
            <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="register" element={<Register />} />
            <Route path="changePass" element={<ChangePassword />} />
          </Route>

          {/* Class Routes */}
          <Route path="/class" element={<Layout />}>
            <Route index element={<ClassIndex />} />
            <Route path="new" element={<ClassNew />} />
            <Route path=":id" element={<ClassShow />} />
            <Route path=":id/addcourse" element={<AddCourse />} />
            <Route path=":id/addstudents" element={<AddStudents />} />
          </Route>

          {/* Course Routes */}
          <Route path="/course" element={<Layout />}>
            <Route index element={<CourseIndex />} />
            <Route path="new" element={<CourseNew />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<Layout />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
          </Route>
          <Route path="classroom/:classId/:courseId" element={<Classroom />} />

          {/* Student Routes */}
          <Route path="/student" element={<Layout />}>
            <Route path="dashboard/:id" element={<StudentDashboard />} />
          </Route>

          <Route path="/assignment" element={<Layout />}>
            <Route path="new/:classId/:courseId" element={<NewAssignment />} />
          </Route>

          {/* Lecture Routes */}
          <Route path="/lecture" element={<Layout />}>
            <Route path=":lectId/:classId" element={<LectureAttendance />} />
            <Route path="new/:classId/:courseId" element={<NewLecture />} />
          </Route>

          {/* Report Routes */}
          <Route path="/report" element={<Layout />}>
            <Route path=":classId/:courseId" element={<AddMarks />} />
            <Route path="generate/:studentId/:classId" element={<Generate />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
