import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import EditBlog from "../../pages/EditBlog";
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
  status,
}) => {
  // console.log("id of that blog", id);
  const handleClick = () => {
    if (status !== "Published") {
      // Redirect to the edit blog page
      <EditBlog edit={onEdit(id)} />;
      // onEdit(id);
    } else {
      // Redirect to the individual blog page
      onReadMore();
    }
  };
  return (
    <article className="card card-style2" onClick={handleClick}>
      <div className="card-img">
        <img className="rounded-top" src={imageUrl} alt="Blog Cover" />
        <div className="date">
          <span>{date}</span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="h5">
          <a href="#!">{title}</a>
        </h3>
        <p className="display-30">{content}</p>
        <Link to={`/blog/getBlogs/${id}`} className="post-link">
          Read More
        </Link>
      </div>
      <div className="card-footer">
        <ul>
          <li>
            <a href="#!">
              <i className="fas fa-user"></i>
              {author}
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="far fa-comment-dots"></i>
              <span>{comments}</span>
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fas fa-thumbs-down"></i>
              <span>{downvotes}</span>
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fas fa-thumbs-up"></i>
              <span>{upvotes}</span>
            </a>
          </li>
          {status !== "Published" && (
            <button className="btn btn-primary bg-slate-500" onClick={onEdit}>
              Edit
            </button>
          )}
        </ul>
      </div>
    </article>
  );
};

export default BlogCard;
