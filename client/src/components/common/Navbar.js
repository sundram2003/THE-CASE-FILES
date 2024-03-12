import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Removebg new.png";
import { useSelector } from "react-redux";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  console.log("token", token);
  return (
    <div className="header">
      {/* Top Navigation Bar */}
      <nav className=" navbar flex justify-between items-center bg-gray-900 p-2 h-[70px]">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-160 h-32 py-[-2px]" />
        </Link>
        {/* Navigation Buttons */}
        <div className="flex space-x-3 justify-evenly">
          <Link to="/">
            <button className="text-white px-4 py-2  rounded-md bg-slate-600  hover:text-blue-500">
              Home
            </button>
          </Link>
          <Link to="/login">
            <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500">
              Sign Up
            </button>
          </Link>
          <Link to="/aboutUs">
            <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500">
              About Us
            </button>
          </Link>
          <Link to="/aboutUs">
            <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded-lg border-none focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2">
            Search
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
