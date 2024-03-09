import React from "react";

const BlogCard = ({ title, content, author }) => {
  return (
    <div className="blog-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Author: {author}</p>
    </div>
  );
};

export default BlogCard;
