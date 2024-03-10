import React from "react";
import BlogCard from "../components/common/AllBlogsCard";
import "../utils/HomeCard.css";
const AllBlogs = () => {
  const blogs = [
    {
      image: "dummy-image1.jpg",
      date: "2022-01-01",
      title: "Dummy Blog 1",
      content: "This is a dummy blog 1",
      author: "John Doe",
      comments: 10,
    },
    {
      image: "dummy-image2.jpg",
      date: "2022-01-02",
      title: "Dummy Blog 2",
      content: "This is a dummy blog 2",
      author: "Jane Smith",
      comments: 5,
    },
    {
      image: "dummy-image3.jpg",
      date: "2022-01-03",
      title: "Dummy Blog 3",
      content: "This is a dummy blog 3",
      author: "Bob Johnson",
      comments: 2,
    },
    // List of blog data
  ];

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            image={blog.image}
            date={blog.date}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            comments={blog.comments}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
