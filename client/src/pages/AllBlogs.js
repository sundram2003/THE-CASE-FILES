import React, { useEffect, useState } from "react";
import BlogCard from "../components/common/AllBlogsCard";
import { getAllBlogs, updateView } from "../services/operations/blogAPI";
import { formattedDate } from "../utils/formattedDate";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import IndividualBlog from "./IndividualBlogs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs(null);
        const data = response?.data;
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  console.log("blogs", blogs);
  const handleReadMore = (blogId) => {
    const ViewHandler = async (blogId) => {
      try {
        const response = await updateView(blogId);
        console.log("response", response);
      } catch (error) {
        console.error("Error updating view:", error);
      }
    };
    ViewHandler();
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
            } // Trim the content to 20 words
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
