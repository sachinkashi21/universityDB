import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login';
import './index.css'
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";


function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
