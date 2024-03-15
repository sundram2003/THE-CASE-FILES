import React from "react";
import "./card.css";
import { Link, useNavigate } from "react-router-dom";
import EditBlog from "../../pages/EditBlog";
import {
  BiCalendar,
  BiComment,
  BiCommentDots,
  BiUserCircle,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
const BlogCard = ({
  id,
  date,
  title,
  author,
  comments,
  imageUrl,
  content,
  followers,
  following,
  downvotes,
  upvotes,
  onReadMore,
  onEdit,
  category,
  // profileImg,
  status,
}) => {
  // console.log("id of that blog", id);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth);
  const handleClick = () => {
    if (status === "Draft") {
      // If blog status is "Draft", prevent both reading more and editing

      console.log("blog is drafted");
      return;
      // }

      // if (status !== "Published") {
      //   // Redirect to the edit blog page using history.push
      //   navigate(`/edit-blog/${id}`);
    } else {
      // Redirect to the individual blog page
      onReadMore();
    }
  };
  const handleAuthorClick = () => {
    if (token === null) {
      // If user is authenticated, navigate to author's page
      toast.success("Please login to read more");
      return navigate("/login");
    } else {
      // If user is not authenticated, redirect to login page
      return navigate(`/profile/${author}`);
    }
  };
  return (
    <div className="product-card" onClick={handleClick}>
      <div className="badge">{status}</div>
      <div className="product-tumb">
        <img src={imageUrl} alt="" />
      </div>
      <div className="product-details">
        <span className="product-catagory">{category}</span>
        <h4>
          <p className=" font-semibold uppercase text-amber-950 ">{title}</p>
        </h4>
        <p className="text-black">
          {content}
          {`...`}
        </p>
        <Link to={`/blog/getBlogs/${id}`} className="post-link">
          Read More
        </Link>
        <div className="product-bottom-details">
          <div className="product-price   ">
            {/* <img src={} alt="Profile Image" /> */}

            <BiUserCircle size={20} />

            {/* <a href={`/auth/getUserByUsername/${author}`}>{author}</a> */}
            {author && (
              <span className="font-semibold" onClick={handleAuthorClick}>
                {author}
              </span>
            )}
          </div>
          <div className="product-price   ">
            {/* <img src={} alt="Profile Image" /> */}

            <h3 className="text-black flex flex-row gap-1">
              {" "}
              <p>
                {" "}
                <BiCalendar size={24} />
              </p>
              <p>{date}</p>
            </h3>
          </div>

          <div className="product-links flex flex-row gap-6">
            <p className="h-2 font-semibold flex flex-row gap-2">
              <FaHeart size={24} />
              {upvotes}
            </p>
            {/* <FaThumbsDown size={24} />
        {downvotes.length} */}
            <p className="h-2 font-semibold flex flex-row gap-2">
              <BiCommentDots size={24} />
              {comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
