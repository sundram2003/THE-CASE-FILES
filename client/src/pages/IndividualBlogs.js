import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// // import Comment from "./Comment";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import "../utils/blog.css";
import { formattedDate } from "../utils/formattedDate";
import { useSelector } from "react-redux";
import {
  getSingleBlog,
  dislikeBlog,
  likeBlog,
  getCommentsByBlogId,
  addComments,
  deleteBlog,
  deleteComment,
} from "../services/operations/blogAPI";
import { BiCommentDots, BiDislike, BiLike, BiTrash } from "react-icons/bi";
import { FaCalendarDay } from "react-icons/fa";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const socket = io("/", {
  reconnection: true,
});

const IndividualBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);
  const [blogComment, setBlogComment] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { userDetails } = useSelector((state) => state.profile);
  console.log("user just after ", userDetails);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getSingleBlog(id, token);
        setBlog(response.data);
        setBlogComment(response?.data?.comments);
        setShowComments(true);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, token]);

  useEffect(() => {
    console.log("SOCKET IO", socket);
    socket.on("new-comment", (newComment) => {
      console.log("newcomment", newComment);
      setCommentsRealTime(newComment);
    });
    // setComments(blog?.comments);
  }, []);
  // useEffect(() => {

  // }); // Update the comments state when the blog changes
  console.log("blog", blog);
  console.log("user", userDetails);
  if (!blog) {
    return <div>Loading...</div>; // Render loading indicator while blog is being fetched
  }

  const handleUpVote = async () => {
    try {
      await likeBlog(id, token);
      // Refresh the blog data after upvoting
      const response = await getSingleBlog(id, token);
      console.log("after liked", response);
      setBlog(response.data);
      console.log("blog liked");
    } catch (error) {
      console.error("Error upvoting blog:", error);
    }
  };

  const handleDownVote = async () => {
    try {
      await dislikeBlog(id, token);
      // Refresh the blog data after downvoting
      const response = await getSingleBlog(id, token);
      setBlog(response.data);
      // setShowComments(false);
      console.log("blog disliked");
    } catch (error) {
      console.error("Error downvoting blog:", error);
    }
  };

  const onDelete = async (blogId) => {
    setLoading(true);
    // const complaint_Id = blogId.toString();
    console.log("blogId", blogId);

    const result = await deleteBlog(blogId, token);

    console.log("Deleted Blog", result);
    if (result) {
      console.log("deleting blog");
      // setComplaints(result);
      navigate("/");

      // toast.success("Complaint Deleted Succesfully");
    }
    setConfirmationModal(null);
    setLoading(false);
  };
  // comment delete
  const onDeleteComment = async (commentId) => {
    setLoading(true);
    // const complaint_Id = blogId.toString();
    console.log("blogId", commentId);

    const result = await deleteComment(commentId, token);

    console.log("Deleted comment", result);
    if (result) {
      console.log("deleting comment");
      // setComplaints(result);

      // toast.success("Complaint Deleted Succesfully");
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const blogId = id;
      const content = comment;
      const response = await addComments(blogId, content, token); // Assuming there's a function to add a comment to a blog
      console.log("response in add comment", response);
      if (response) {
        // Update the local state or fetch the updated blog again
        setComment(""); // Clear the comment input
        console.log("response in add comment", response);
        setComments(response?.data?.data?.comments);
        setShowComments(false);
        console.log("setComments comment", comments);
        toast.success("comments added");
        socket.emit("comment", response?.data?.data?.comments);
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const url = window.location.href;
  console.log("url", url);
  // let uiCommentUpdate =
  //   commentsRealTime.length > 0 ? commentsRealTime : comments;
  // console.log("comments in individual blog", commentsRealTime);
  console.log("comment without real time", blogComment);
  return (
    <div className="container">
      <div className="cs-blog-detail">
        <div className="cs-main-post">
          <figure>
            <img
              onLoad={() => {
                /* handle onLoad event */
              }}
              data-pagespeed-url-hash="2714250504"
              alt="jobline-blog (8)"
              src={blog?.coverImg}
            />
          </figure>
        </div>
        <div className="cs-post-title">
          <div className="cs-author">
            <div className="cs-text">
              <p className=" border-e-slate-900 bg-slate-200 p-3">
                {blog?.status}
              </p>
              <a
                href={`/auth/getUserByUsername/${blog?.createdBy?.username}`}
                className=" font-extrabold text-2xl uppercase"
              >
                {blog?.createdBy?.firstName} {blog?.createdBy?.lastName}
              </a>
            </div>
          </div>
          <div className="flex flex-row gap-4 px-3 justify-end ">
            {userDetails?.data?.isModerator && (
              <span className="post-date">
                <BiTrash
                  id={blog?._id}
                  className="delete-icon text-red-400 cursor-pointer"
                  size={24}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(blog?._id);
                  }}
                />
              </span>
            )}

            <span className="post-date">
              <i className="cs-color icon-calendar6"></i>
              <BiLike aria-hidden="true" size={20} onClick={handleUpVote} />
              {blog?.upvotes?.length}
            </span>
            <span className="post-date">
              {/* <i className="cs-color icon-calendar6"></i> */}
              <BiDislike
                aria-hidden="true"
                size={20}
                onClick={handleDownVote}
              />
              {blog?.downvotes?.length}
            </span>
            <span className="post-date">
              <FaCalendarDay />
              {formattedDate(blog?.createdBy?.createdAt)}
            </span>
            <span className="post-comment">
              <p className="">
                {" "}
                <BiCommentDots aria-hidden="true" size={20} />
                {blog?.comments?.length}
              </p>

              {/* </div> */}
            </span>
          </div>
        </div>
        {/* shareing on social media */}
        <div className="flex gap-4">
          <FacebookShareButton
            url={window.location.href} // Use window.location.href to get the current page URL
            quote={blog?.title} // Use the blog title as the share quote
            // hashtag="#yourhashtag" // Add a hashtag if needed
            content={blog?.content}
          >
            <FaFacebook
              className="cursor-pointer p-1 "
              aria-hidden="true"
              size={36}
            />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href} // Use window.location.href to get the current page URL
            title={blog?.title} // Use the blog title as the tweet text
            // hashtags={["yourhashtag"]} // Add hashtags if needed
            content={blog?.content}
          >
            <FaTwitter
              className="cursor-pointer p-1 "
              aria-hidden="true"
              size={36}
            />
          </TwitterShareButton>
        </div>

        <div className="cs-post-option-panel">
          <div className="rich-editor-text">
            <h2 className="text-slate-900 font-serif text-xl uppercase">
              {blog?.title}
            </h2>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <blockquote className="text-left-align">
                {/* <span> {blog?.content}</span> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                />
                ;
              </blockquote>
            </div>
            <p></p>
          </div>
        </div>
        <div className="cs-tags">
          <div className="tags">
            {blog?.tags.map((tag, index) => (
              <span key={index}>
                <ul>
                  <li>
                    <a
                      rel="tag"
                      href="http://jobcareer.chimpgroup.com/jobdoor/tag/college/"
                    >
                      {tag}
                    </a>
                  </li>
                </ul>
              </span>
            ))}
          </div>
        </div>
        <div className="comment-section">
          <h3>Add a Comment</h3>
          <form onSubmit={handleAddComment}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
            ></textarea>
            <button type="submit">Add Comment</button>
          </form>
        </div>
        {!showComments && blog?.comments && (
          <div className="comments p-4">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            {comments.map((comment) => (
              <div key={comment._id} className="comment mb-4">
                <p className="text-sm text-gray-600">
                  By {comment?.createdBy?.firstName}{" "}
                  {comment?.createdBy?.lastName} on{" "}
                  {formattedDate(comment?.createdAt)}
                </p>
                <p className="text-base">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
        {showComments && (
          <div className="comments p-4">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            {blogComment.map((comment) => (
              <div key={comment._id} className="comment mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-bold">
                    {comment?.createdBy?.firstName}
                  </span>{" "}
                  <span className="font-bold">
                    {comment?.createdBy?.lastName}
                  </span>{" "}
                  on {formattedDate(comment?.createdAt)}
                  <span className="font-bold ">
                    {userDetails?.data?.isModerator && ( // Display delete icon only for moderators
                      <span
                        className="delete-comment-icon"
                        onClick={() => onDeleteComment(comment._id)}
                      >
                        <BiTrash
                          className="cursor-pointer text-slate-600"
                          size={20}
                        />
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-base">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* adding comments */}
      </div>
    </div>
  );
};

export default IndividualBlog;
