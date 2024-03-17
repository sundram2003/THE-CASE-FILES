import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
// // import Comment from "./Comment";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import "../utils/blog.css";
import { formattedDate } from "../utils/formattedDate";
import { useSelector } from "react-redux";
import {
  getSingleBlog,
  dislikeBlog,
  likeBlog,
  getCommentsByBlogId,
  addComments,
} from "../services/operations/blogAPI";
import { BiCommentDots, BiDislike, BiLike } from "react-icons/bi";
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
  }, []);
  console.log("blog", blog);

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

  // const toggleComments = async (e) => {
  //   e.preventDefault();
  //   if (!showComments) {
  //     await handleGetComments();
  //   }
  //   if (showComments) setComments([]); // Clear comments when hiding
  //   setShowComments(!showComments);
  // };

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
        <div className="cs-post-option-panel">
          <div className="rich-editor-text">
            <h2 className="text-slate-900 font-serif text-xl uppercase">
              {blog?.title}
            </h2>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <blockquote className="text-left-align">
                <span> {blog?.content}</span>
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
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.content}</p>
                <p className="comment-author">
                  By {comment?.createdBy?.firstName}{" "}
                  {comment?.createdBy?.lastName} on{" "}
                  {formattedDate(comment?.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
        {showComments && (
          <div className="comments  p-4">
            <h3>Comments</h3>
            {blogComment.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.content}</p>
                <p className="comment-author">
                  By {comment?.createdBy?.firstName}{" "}
                  {comment?.createdBy?.lastName} on{" "}
                  {formattedDate(comment?.createdAt)}
                </p>
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
