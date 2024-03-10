// IndividualBlog.js
import "../utils/comment.css";
import React from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
const IndividualBlog = () => {
  const { id } = useParams();

  return (
    <div id="main-content" className="blog-page">
      {/* Individual Blog Content Goes Here */}
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-8 col-md-12 left-box">
            {/* Individual Blog Card */}
            <div className="card single_post">
              <div className="body">
                {/* Individual Blog Image */}
                <div className="img-post">
                  <img
                    className="d-block img-fluid"
                    src="https://www.bootdey.com/image/800x280/87CEFA/000000"
                    alt="First slide"
                  />
                </div>
                {/* Individual Blog Title */}
                <h3>
                  <a href="blog-details.html">All photographs are accurate</a>
                </h3>
                {/* Individual Blog Description */}
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
            {/* Comments Section */}
            <div className="card">
              <div className="header">
                <h2>Comments 3</h2>
              </div>
              <div className="body">
                {/* Comments List */}
                <ul className="comment-reply list-unstyled">
                  {/* Individual Comment */}
                  <li className="row clearfix">
                    {/* Commenter Avatar */}
                    <div className="icon-box col-md-2 col-4">
                      <img
                        className="img-fluid img-thumbnail"
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Awesome Image"
                      />
                    </div>
                    {/* Comment Text */}
                    <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                      <h5 className="m-b-0">Gigi Hadid</h5>
                      <p>
                        Why are there so many tutorials on how to decouple
                        WordPress? how fast and easy it is to get it running
                        (and keep it running!) and its massive ecosystem.
                      </p>
                      <ul className="list-inline">
                        <li>
                          <a href="javascript:void(0);">Mar 09 2018</a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">Reply</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* Add more comments as needed */}
                </ul>
              </div>
            </div>
            {/* Comment Form */}
            <Comment />
          </div>
          {/* Right Sidebar (Categories, Popular Posts, Instagram Post, Email Newsletter) */}
          <div className="col-lg-4 col-md-12 right-box">
            {/* Right Sidebar Content Goes Here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualBlog;
