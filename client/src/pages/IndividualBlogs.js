import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
// import Comment from "./Comment";
import { formattedDate } from "../utils/formattedDate";
import { useSelector } from "react-redux";
import { getSingleBlog } from "../services/operations/blogAPI";

const IndividualBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getSingleBlog(id, token);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, token]);
  console.log("blog", blog);
  if (!blog) {
    return <div>Loading...</div>; // Render loading indicator while blog is being fetched
  }

  // const toggleComments = async (e) => {
  //   e.preventDefault();
  //   if (!showComments) {
  //     await handleGetComments();
  //   }
  //   if (showComments) setComments([]); // Clear comments when hiding
  //   setShowComments(!showComments);
  // };

  // const handleGetComments = async () => {
  //   try {
  //     setIsLoadingComments(true);
  //     const response = await getCommentsByBlogId(id, token); // Assuming there's a function to fetch comments by blog ID
  //     if (response) {
  //       setComments(response);
  //     } else {
  //       console.error("Error fetching comments");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   } finally {
  //     setIsLoadingComments(false);
  //   }
  // };

  // const handleAddComment = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await addCommentToBlog(id, comment, token); // Assuming there's a function to add a comment to a blog
  //     if (response) {
  //       // Update the local state or fetch the updated blog again
  //       setComment(""); // Clear the comment input
  //     } else {
  //       console.error("Error adding comment");
  //     }
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  return (
    <div>
      <div>
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row gap-2 mt-6 mb-2">
            <label className="mr-8 text-gray-700 font-bold text-xl">
              Title:
            </label>
            <h1 className="mr-8 text-gray-900 font-bold text-xl">
              {blog.title}
            </h1>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-2">
              <img
                src={blog.coverImg}
                alt="Blog Image"
                className="h-[300px] w-[400px] rounded-lg object-cover"
              />
            </div>

            <div className="flex flex-col gap-2 ml-5">
              <label className="mr-8 text-slate-700">Content:</label>{" "}
              <p className="text-yellow-800">{blog?.content}</p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-2">
              <label className="mt-2 text-gray-500">Upvotes:</label>
              <h1 className="mr-6 mt-2.5 text-gray-600">
                {blog?.upvotes.length}
              </h1>
            </div>

            <div className="flex flex-row gap-2">
              <label className="mt-2 text-gray-700">Downvotes:</label>
              <h1 className="mr-6 mt-2.5 text-gray-800">
                {blog?.downvotes.length}
              </h1>
            </div>

            <div className="flex flex-col gap-1">
              <label className="mr-8 mt-1.5 text-gray-800">Status:</label>
              <h1
                style={{ color: blog.status === "Published" ? "green" : "red" }}
              >
                {blog.status}
              </h1>
            </div>

            <div className="flex flex-col align-center gap-1">
              <label className="mr-8 mt-1.5 text-gray-600">Created By:</label>
              <h1 className="mr-8 text-gray-800">
                {blog?.createdBy?.username}
              </h1>
            </div>
          </div>

          {/* <div className="flex flex-col gap-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Comment:
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                className="block p-1 w-full text-l text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your comment here..."
              ></textarea>
              <button
                className="ml-50 mt-3 mb-3 py-2 px-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>

            <button
              onClick={toggleComments}
              disabled={isLoadingComments}
              className="mt-3 mb-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              {isLoadingComments
                ? "Loading Comments..."
                : showComments
                ? "Hide Comments"
                : "Show Comments"}
            </button>

            {showComments && (
              <ul className="form-style text-white">
                {comments.map((comment) => (
                  <div key={comment._id}>
                    <div class="mx-auto my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-white-600 shadow-lg sm:p-8">
                      <div class="w-full text-left">
                        <div class="mb-2 flex flex-col justify-between text-white-600 sm:flex-row">
                          <h3 class="font-medium">{comment?.userName}</h3>
                          <time class="text-xs" datetime="2022-11-13T20:00Z">
                            {formattedDate(comment.createdAt)}
                          </time>
                        </div>
                        <p class="text-sm">{comment.text} </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default IndividualBlog;
