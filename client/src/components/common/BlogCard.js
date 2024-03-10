import React from "react";
import "./card.css";
const BlogCard = ({ date, title, author, comments, imageUrl, content }) => {
  return (
    <article className="card card-style2">
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
        <a href="#!" className="read-more">
          Read more
        </a>
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
        </ul>
      </div>
    </article>
  );
};

export default BlogCard;
