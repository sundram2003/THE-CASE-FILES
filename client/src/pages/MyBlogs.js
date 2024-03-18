import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteBlog,
  getMyBlogs,
  updateView,
} from "../services/operations/blogAPI";
import { formattedDate } from "../utils/formattedDate";
import { useSelector } from "react-redux";
import RectangularBlogCard from "../components/common/BlogCard";
import EditBlog from "./EditBlog";
import { BiEdit } from "react-icons/bi";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log("myblogs", blogs);
  const [confirmationModal, setConfirmationModal] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getMyBlogs(token);
        console.log("response in all blogs", response?.data);
        if (response) {
          const data = response?.data;
          setBlogs(data);
        } else {
          console.log("Not getting response");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };
    fetchBlogs();
  }, [token]);

  const handleReadMore = (blogId) => {
    //adding updateview api

    const ViewHandler = async (blogId) => {
      try {
        const response = await updateView(blogId);
        console.log("response", response);
      } catch (error) {
        console.error("Error updating view:", error);
      }
      ViewHandler();
    };

    navigate(`/blog/getBlogs/${blogId}`); // Redirect to individual blog page
    setLoading(true); // Set loading to true when editing starts
  };

  const handleEdit = (blogId, status) => {
    if (status !== "Published") {
      console.log("blogId", blogId);
      // navigate(`/blog/update/${blogId}`); // Redirect to edit blog page with blogId
      navigate(`/blog/update/${blogId}`); // Redirect to edit blog page with blogId // Render EditBlog component with id prop
    } else {
      // Handle error or display a message indicating that the blog cannot be edited
      console.log("Cannot edit a published blog.");
    }
  };
  // const EditButton = ({ onClick }) => {
  //   return <BiEdit onClick={onClick} />;
  // };
  const handleDeleteBlog = async (blogId) => {
    setLoading(true);
    // const complaint_Id = blogId.toString();
    console.log("blogId", blogId);

    const result = await deleteBlog(blogId, token);
    const response = await getMyBlogs(token);
    if (response) {
      const data = response?.data;
      setBlogs(data); // Assuming data is an object with a 'blogs' property
    }

    console.log("Deleted Blog", result);
    if (result) {
      console.log("deleting blog");
      // setComplaints(result);
      // toast.success("Complaint Deleted Succesfully");
    }
    setConfirmationModal(null);
    setLoading(false);
  };
  console.log("Blog inside myBlogs", blogs);
  return (
    <section>
      <div className="container">
        <div className="text-center mb-5">
          <h5 className="text-primary h6">Our Blog</h5>
          <h2 className="display-20 display-md-18 display-lg-16">
            Most recent our blog
          </h2>
        </div>
        <div className="row">
          {/* Display a loading message while fetching data */}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            // Iterate through blogs array and render BlogCard for each blog
            blogs?.blogs &&
            blogs?.blogs.map((post, index) => (
              <div key={index} className="col-lg-4 col-md-6 py-3 mb-2-6">
                <RectangularBlogCard
                  imageUrl={post.coverImg}
                  date={formattedDate(post.updatedAt)}
                  title={post.title}
                  content={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.substring(0, 300),
                      }}
                    />
                  }
                  // content={post.content.substring(0, 300) + "..."} // Trim content to 20 words
                  author={post?.username}
                  comments={post?.comments?.length}
                  downvotes={post?.downvotes?.length}
                  upvotes={post?.upvotes?.length}
                  onReadMore={() => handleReadMore(post._id)}
                  category={post.category?.name}
                  status={post.status}
                  onEdit={() => handleEdit(post._id, post.status)}
                  onDelete={() => handleDeleteBlog(post._id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
