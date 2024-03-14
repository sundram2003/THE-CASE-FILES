import React from "react";
import BlogCard from "../components/common/BlogCard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import first from "../assets/images/first.png";
import sec from "../assets/images/sec.png";
import third from "../assets/images/third.png";
import AllBlogs from "./AllBlogs";
const Home = () => {
  // Sample blog data
  return (
    <div className="hero">
      {/* Main Content */}
      <div className="flex-1 container mx-auto hero-section">
        {/* Your main content goes here */}
        <h1 className="text-3xl text-blue-950 font-bold underline p-3">
          Welcome to CredLock
        </h1>
        {/* Example content */}
        <p className="text-2xl font-serif text-slate-700 p-3">
          CredLock is dedicated to empowering college minds by providing
          valuable educational resources and fostering a community where
          students can learn from each other's experiences.
        </p>
      </div>
      <h1 className="text-slate-800 p-8  font-bold text-xl">
        {" "}
        Our mission is to create a platform that not only offers academic
        support but also encourages personal growth and development. At
        CredLock, we believe in the importance of learning from both successes
        and failures, which is why we strive to share stories of past
        misdemeanors and challenges faced by students.
      </h1>
      <div>
        <AllBlogs />
      </div>

      {/* Your existing content here */}
      <Footer />
    </div>
  );
};

export default Home;
