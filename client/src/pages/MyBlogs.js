import React from "react";
import BlogCard from "../components/common/BlogCard"; // Import the BlogCard component
import "../components/common/card.css"; // Import the BlogPage component styles
const BlogPage = () => {
  // Sample data for blog posts
  const blogPosts = [
    {
      date: "15 Sep",
      title: "Loft therapy taking care of your home",
      author: "Brittany Hucks",
      comments: 26,
      imageUrl: "https://www.bootdey.com/image/350x280/6A5ACD/000000",
      content: "Loft therapy will be a thing of the past and here's why.",
    },
    {
      date: "20 Sep",
      title: "The art of interior design",
      author: "John Smith",
      comments: 12,
      imageUrl: "https://www.bootdey.com/image/350x280/6A5ACD/000000",
      content: "Discover the secrets of creating stunning interiors.",
    },
    {
      date: "25 Sep",
      title: "Tips for a cozy bedroom",
      author: "Emily Johnson",
      comments: 8,
      imageUrl: "https://www.bootdey.com/image/350x280/6A5ACD/000000",
      content: "Transform your bedroom into a cozy sanctuary.",
    },
    // Add more blog post data as needed
  ];

  return (
    <section>
      <div className="container">
        <div className="text-center mb-5">
          <h5 className="text-primary h6">Our Blog</h5>
          <h2 className="display-20 display-md-18 display-lg-16">
            Most recent our blog
          </h2>
        </div>
        <div className="row">
          {/* Iterate through blogPosts array and render BlogCard for each blog post */}
          {blogPosts.map((post, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-2-6">
              <BlogCard
                date={post.date}
                title={post.title}
                author={post.author}
                comments={post.comments}
                imageUrl={post.imageUrl}
                content={post.content}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
