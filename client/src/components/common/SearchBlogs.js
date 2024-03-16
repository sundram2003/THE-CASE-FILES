// import React, { useEffect, useState } from "react";
// import BlogCard from "../common/AllBlogsCard";
// import { formattedDate } from "../../utils/formattedDate";
// import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate from react-router-dom
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { getBlogbyTitle } from "../../services/operations/blogAPI";

// const SearchBlogs = ({ searchResults }) => {
//   // Accept searchResults as a prop
//   const [blogs, setBlogs] = useState([]); // Initialize blogs state with searchResults
//   //   setBlogs(searchResults);
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   console.log("search result", searchResults);

//   const { title } = useParams(); // Get the "title" parameter from the URL
//   console.log("inside searchblogs title", title);
//   useEffect(() => {
//     // Fetch blogs by title using the "title" parameter
//     const fetchBlogs = async () => {
//       try {
//         const response = await getBlogbyTitle(title, token);
//         const data = response?.data;
//         setBlogs(data.data);
//       } catch (error) {
//         console.error("Error fetching blogs by title:", error);
//       }
//     };
//     fetchBlogs();
//     // Fetch blogs by title
//     // Update the "blogs" state with the fetched data
//   }, []); // Update blogs state when searchResults prop changes

//   const handleReadMore = (blogId) => {
//     if (token === null) {
//       toast.success("Please login to read more");
//       navigate(`/login`);
//     } else {
//       navigate(`/blog/getBlogs/${blogId}`); // Redirect to single blog page
//     }
//   };
//   console.log("blogs in search resiult", blogs);
//   return (
//     <div className="container">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
//         {blogs.map((blog, index) => (
//           <BlogCard
//             key={index}
//             imageUrl={blog.coverImg}
//             date={formattedDate(blog.updatedAt)}
//             title={blog.title}
//             content={blog.content.split(" ").slice(0, 100).join(" ")} // Trim the content to 20 words
//             status={blog.status}
//             author={blog.createdBy.username}
//             comments={blog?.comments?.length}
//             downvotes={blog?.downvotes?.length}
//             upvotes={blog?.upvotes?.length}
//             category={blog.category?.name}
//             onReadMore={() => handleReadMore(blog._id)} // Pass the handleReadMore function as a prop
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBlogs;
import React, { useEffect, useState } from "react";
import BlogCard from "../common/AllBlogsCard";
import { formattedDate } from "../../utils/formattedDate";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getBlogbyTitle } from "../../services/operations/blogAPI";

const SearchBlogs = ({ searchResults }) => {
  const [blogs, setBlogs] = useState([]); // Initialize blogs state with an empty array
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { title } = useParams(); // Get the "title" parameter from the URL

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogbyTitle(title, token);
        const data = response?.data;
        console.log("data in searchblogs", data);
        if (response?.success) setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs by title:", error);
      }
    };
    fetchBlogs();
  }, [title, token]); // Include title and token in the dependency array

  const handleReadMore = (blogId) => {
    if (token === null) {
      toast.success("Please login to read more");
      navigate(`/login`);
    } else {
      navigate(`/blog/getBlogs/${blogId}`);
    }
  };
  console.log("blogs in search resiult", blogs);
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-8">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            imageUrl={blog.coverImg}
            date={formattedDate(blog.updatedAt)}
            title={blog.title}
            content={blog.content.split(" ").slice(0, 100).join(" ")}
            status={blog.status}
            author={blog.createdBy.username}
            comments={blog?.comments?.length}
            downvotes={blog?.downvotes?.length}
            upvotes={blog?.upvotes?.length}
            category={blog.category?.name}
            onReadMore={() => handleReadMore(blog._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBlogs;
