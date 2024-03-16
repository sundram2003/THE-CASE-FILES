import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Removebg new.png";
import { useSelector } from "react-redux";
import SearchComponent from "./Search";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  console.log("token", token);
  return (
    <div className="header ">
      {/* Top Navigation Bar */}
      <nav className=" navbar flex justify-between items-center bg-gray-900 p-2 h-[90px]">
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
          {token !== null && (
            <Link to="/dashboard/my-profile" className="relative">
              {
                <button className="text-white px-4 py-2  rounded-md bg-slate-600  hover:text-blue-500">
                  Dashboard
                </button>
              }
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/register">
              <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500">
                Sign Up
              </button>
            </Link>
          )}
          {/* <Link to="/register"></Link> */}
          <Link to="/aboutUs">
            <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500">
              About Us
            </button>
          </Link>
          <Link to="/ContactUs">
            <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500 ">
              Contact Us
            </button>
          </Link>
          <Link to="/blogs">
            <button className="text-white px-4 py-2 rounded-md bg-slate-600  hover:text-blue-500 ">
              Blogs
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div>
          <SearchComponent />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
