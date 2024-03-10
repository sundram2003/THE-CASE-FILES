// CommentForm.js
import React from "react";
import "../utils/comment.css";
const Comment = () => {
  return (
    <div className="card">
      <div className="header">
        <h2>
          Leave a reply{" "}
          <small>
            Your email address will not be published. Required fields are
            marked*
          </small>
        </h2>
      </div>
      <div className="body">
        <div className="comment-form">
          <form className="row clearfix">
            {/* Commenter Name Field */}
            <div className="col-sm-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
            </div>
            {/* Commenter Email Field */}
            <div className="col-sm-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>
            </div>
            {/* Comment Text Area */}
            <div className="col-sm-12">
              <div className="form-group">
                <textarea
                  rows="4"
                  className="form-control no-resize"
                  placeholder="Please type what you want..."
                ></textarea>
              </div>
              {/* Submit Button */}
              <button type="submit" className="btn btn-block btn-primary">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;
