import React from "react";
import "../../utils/HomeCard.css";
const BlogCard = ({ image, date, title, content, author, comments }) => {
  return (
    <div className="media blog-media">
      <a href="#">
        <img className="d-flex" src={image} alt="Generic placeholder image" />
      </a>
      <div className="circle">
        <h5 className="day">{date.day}</h5>
        <span className="month">{date.month}</span>
      </div>
      <div className="media-body">
        <a href="#">
          <h5 className="mt-0">{title}</h5>
        </a>
        <p>{content}</p>
        <a href="#" className="post-link">
          Read More
        </a>
        <ul>
          <li>by: {author}</li>
          <li className="text-right">
            <a href="#">{comments} comments</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogCard;
