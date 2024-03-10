import React from "react";
import BlogCard from "../components/common/BlogCard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AllBlogs from "./AllBlogs";
const Home = () => {
  // Sample blog data
  return (
    <div className="hero">
      {/* Main Content */}
      <div className="flex-1 container mx-auto hero-section">
        {/* Your main content goes here */}
        <h1 className="text-3xl text-blue-950 font-bold underline">
          Welcome to CredLock
        </h1>
        {/* Example content */}
        <p>This is your homepage content.</p>
      </div>
      <h1>Welcome to the Blog Website</h1>
      <div>
        <AllBlogs />
      </div>

      {/* Your existing content here */}
      <Footer />
    </div>
  );
};

export default Home;
