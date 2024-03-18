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
        {/* Main Heading */}
        <h1 className="mt-5 text-3xl font-bold text-center">Welcome to CredLock</h1>
        {/* Description */}
        <p className="text-2xl font-serif text-slate-700 p-3 text-center">
          CredLock is dedicated to empowering college minds by providing
          valuable educational resources and fostering a community where
          students can learn from each other's experiences.
        </p>
        {/* Mission Statement */}
        <h1 className="text-slate-800 p-8  font-bold text-xl text-center">
          Our mission is to create a platform that not only offers academic
          support but also encourages personal growth and development. At
          CredLock, we believe in the importance of learning from both successes
          and failures, which is why we strive to share stories of past
          misdemeanors and challenges faced by students.
        </h1>
      </div>
      {/* Display All Blogs */}
      <div>
        <AllBlogs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
