import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login';
import './index.css'
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

import ClassIndex from "./pages/Class/Index";
import ClassNew from "./pages/Class/New";
import ClassShow from "./pages/Class/Show";
import ClassLayout from './layouts/ClassLayout';
import AddCourse from './pages/Class/AddCourse';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/class" element={<ClassLayout/>}>
          <Route index element={<ClassIndex/>}></Route>
          <Route path='new' element={<ClassNew/>}></Route>
          <Route path=':id' element={<ClassShow/>}></Route>
          <Route path=':id/addcourse' element={<AddCourse/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
