import React, { useEffect, useState } from "react";
import AllBlogPages from "./AllBlogPages";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllBlogs,
  fetchMostRecentBlogs,
  fetchMostVotedBlogs,
} from "../services/operations/blogAPI";
import { setMostRecentBlog, setMostVotedBlog } from "../slices/blogSlice";

export default function Blogs() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [filterType, setFilterType] = useState("all"); // "all", "mostRecent", "mostLiked"
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      let result;
      try {
        switch (filterType) {
          case "mostRecent":
            result = await fetchMostRecentBlogs(token);
            if (result) {
              setBlogs(result);
              dispatch(setMostRecentBlog(result));
            }
            break;
          case "mostLiked":
            result = await fetchMostVotedBlogs(token);
            if (result) {
              setBlogs(result);
              dispatch(setMostVotedBlog(result));
            }
            break;
          default:
            result = await getAllBlogs(token);
            if (result) {
              setBlogs(result);
              dispatch(setBlogs(result));
            }
            break;
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [filterType, token, dispatch]);
  console.log("blogs", blogs);
  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-richblack-800 rounded px-2 py-1"
        >
          <option value="all">All Blogs</option>
          <option value="mostRecent">Most Recent Blogs</option>
          <option value="mostLiked">Most Liked Blogs</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        blogs?.data && <AllBlogPages blogs={blogs.data} />
      )}
    </div>
  );
}
