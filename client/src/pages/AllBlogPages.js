import React, { useEffect, useState } from "react";
import BlogCard from "../components/common/AllBlogsCard";
import { getAllBlogs } from "../services/operations/blogAPI";
import { formattedDate } from "../utils/formattedDate";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import IndividualBlog from "./IndividualBlogs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
// import React from "react";
const AllBlogs = ({ blogs }) => {
  //   const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log("token inside blog page", token);
  const handleReadMore = (blogId) => {
    if (token === null) {
      toast.success("Please login to read more");
      navigate(`/login`);
    } else {
      navigate(`/blog/getBlogs/${blogId}`); // Redirect to single blog page
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            imageUrl={blog.coverImg}
            date={formattedDate(blog.updatedAt)}
            title={blog.title}
            content={
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content.split(" ").slice(0, 100).join(" "),
                }}
              />
            }
            // content={blog.content.split(" ").slice(0, 100).join(" ")} // Trim the content to 20 words
            status={blog.status}
            author={blog.createdBy.username}
            comments={blog?.comments?.length}
            downvotes={blog?.downvotes?.length}
            upvotes={blog?.upvotes?.length}
            category={blog.category?.name}
            onReadMore={() => handleReadMore(blog._id)} // Pass the handleReadMore function as a prop
          />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
