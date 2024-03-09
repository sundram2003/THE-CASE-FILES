import React from "react";
import BlogCard from "../components/common/BlogCard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
const Home = () => {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "Blog 1",
      content: "This is the content of Blog 1",
    },
    {
      id: 2,
      title: "Blog 2",
      content: "This is the content of Blog 2",
    },
    {
      id: 3,
      title: "Blog 3",
      content: "This is the content of Blog 3",
    },
  ];

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
        {blogs.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} content={blog.content} />
        ))}
      </div>

      {/* Your existing content here */}
      <Footer />
    </div>
  );
};

export default Home;
