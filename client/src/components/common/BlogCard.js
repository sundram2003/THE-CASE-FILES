import React from "react";
import "./RectangularBlogCard.css"; // Import CSS file for styling
import { BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RectangularBlogCard = ({
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
  status,
  blogs,
  category,
  onDelete,
}) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth);
  const handleClick = () => {
    if (status === "Draft") {
      console.log("blog is drafted");
      return;
    } else {
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
    <article className="rectangular-blog-card" onClick={handleClick}>
      <div className="rectangular-blog-card-img">
        <img src={imageUrl} alt="Blog Cover" />
      </div>
      <div className="rectangular-blog-card-content">
        <div className="flex justify">
          <div>
            <span className="rectangular-blog-card-title text-slate-600 font-bold uppercase ">
              {title}
            </span>
            <span className="rectangular-blog-card-date font-semibold p-4">
              {date}
            </span>
          </div>
          {status === "Draft" && ( // Render edit icon if status is "Draft"
            <BiEdit
              id={id}
              className="edit-icon"
              size={24}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the onClick event from bubbling up to the card
                onEdit(id, status);
              }}
            />
          )}
          <BiTrash
            id={id}
            className="delete-icon text-red-400"
            size={24}
            onClick={(e) => {
              e.stopPropagation(); // Prevent the onClick event from bubbling up to the card
              onDelete(id); // Invoke onDelete function with the blog ID
            }}
          />
        </div>
        <p className="rectangular-blog-card-excerpt text-slate-600 font-serif">
          {content}
        </p>
        <div className="rectangular-blog-card-bottom">
          <div className="flex justify-between">
            <div>
              {author && (
                <span className="font-semibold" onClick={handleAuthorClick}>
                  {author}
                </span>
              )}
              {/* <span className="font-semibold">{author}</span> */}
              <div className="flex flex-col gap-1 ">
                <span className="text-sm text-gray-500 ml-2">
                  {followers} Followers
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {blogs} Blogs
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500">{upvotes} Upvotes</span>
              <span className="text-sm text-gray-500 ml-2">
                {comments} Comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RectangularBlogCard;
