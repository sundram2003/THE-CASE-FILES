import React from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/common/Navbar";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import { Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Error from "./pages/Error";
import Footer from "./components/common/Footer";
function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
