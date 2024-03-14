// // import React from "react";
// // import "./card.css";
// // import { Link } from "react-router-dom";
// // import EditBlog from "../../pages/EditBlog";
// // const BlogCard = ({
// //   id,
// //   date,
// //   title,
// //   author,
// //   comments,
// //   imageUrl,
// //   content,
// //   followers,
// //   following,
// //   downvotes,
// //   upvotes,
// //   onReadMore,
// //   onEdit,
// //   status,
// // }) => {
// //   // console.log("id of that blog", id);
// //   const handleClick = () => {
// //     if (status !== "Published") {
// //       // Redirect to the edit blog page
// //       <EditBlog edit={onEdit(id)} />;
// //       // onEdit(id);
// //     } else {
// //       // Redirect to the individual blog page
// //       onReadMore();
// //     }
// //   };
// //   return (
// //     <article className="card card-style2" onClick={handleClick}>
// //       <div className="card-img">
// //         <img className="rounded-top" src={imageUrl} alt="Blog Cover" />
// //         <div className="date">
// //           <span>{date}</span>
// //         </div>
// //       </div>
// //       <div className="card-body">
// //         <h3 className="h5">
// //           <a href="#!">{title}</a>
// //         </h3>
// //         <p className="display-30">{content}</p>
// //         <Link to={`/blog/getBlogs/${id}`} className="post-link">
// //           Read More
// //         </Link>
// //       </div>
// //       <div className="card-footer">
// //         <ul>
// //           <li>
// //             <a href="#!">
// //               <i className="fas fa-user"></i>
// //               {author}
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#!">
// //               <i className="far fa-comment-dots"></i>
// //               <span>{comments}</span>
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#!">
// //               <i className="fas fa-thumbs-down"></i>
// //               <span>{downvotes}</span>
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#!">
// //               <i className="fas fa-thumbs-up"></i>
// //               <span>{upvotes}</span>
// //             </a>
// //           </li>
// //           {status !== "Published" && (
// //             <button className="btn btn-primary bg-slate-500" onClick={onEdit}>
// //               Edit
// //             </button>
// //           )}
// //         </ul>
// //       </div>
// //     </article>
// //   );
// // };

// // export default BlogCard;

// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // import React from "react";
// // import "./card2.css";
// // import { Link, useNavigate } from "react-router-dom";
// // import EditBlog from "../../pages/EditBlog";
// // import { BiComment, BiCommentDots, BiUserCircle } from "react-icons/bi";
// // import { FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
// // const BlogCard = ({
// //   id,
// //   date,
// //   title,
// //   author,
// //   comments,
// //   imageUrl,
// //   content,
// //   followers,
// //   following,
// //   downvotes,
// //   upvotes,
// //   onReadMore,
// //   onEdit,
// //   category,
// //   // profileImg,
// //   status,
// // }) => {
// //   // console.log("id of that blog", id);
// //   const navigate = useNavigate();
// //   const handleClick = () => {
// //     if (status === "Draft") {
// //       // If blog status is "Draft", prevent both reading more and editing

// //       console.log("blog is drafted");
// //       return;
// //       // }

// //       // if (status !== "Published") {
// //       //   // Redirect to the edit blog page using history.push
// //       //   navigate(`/edit-blog/${id}`);
// //     } else {
// //       // Redirect to the individual blog page
// //       onReadMore();
// //     }
// //   };
// //   return (
// //     //     // <article className="card card-style2" onClick={handleClick}>
// //     //     //   <div className="card-img">
// //     //     //     <img className="rounded-top" src={imageUrl} alt="Blog Cover" />
// //     //     //     <div className="date">
// //     //     //       <span>{date}</span>
// //     //     //     </div>
// //     //     //   </div>
// //     //     //   <div className="card-body">
// //     //     //     <h3 className="h5">
// //     //     //       <a href="#!">{title}</a>
// //     //     //     </h3>
// //     //     //     <p className="display-30">{content}</p>
// //     //     //     <Link to={`/blog/getBlogs/${id}`} className="post-link">
// //     //     //       Read More
// //     //     //     </Link>
// //     //     //   </div>
// //     //     //   <div className="card-footer">
// //     //     //     <ul>
// //     //     //       <li>
// //     //     //         <a href="#!">
// //     //     //           <i className="fas fa-user"></i>
// //     //     //           {author}
// //     //     //         </a>
// //     //     //       </li>
// //     //     //       <li>
// //     //     //         <a href="#!">
// //     //     //           <i className="far fa-comment-dots"></i>
// //     //     //           <span>{comments}</span>
// //     //     //         </a>
// //     //     //       </li>
// //     //     //       <li>
// //     //     //         <a href="#!">
// //     //     //           <i className="fas fa-thumbs-down"></i>
// //     //     //           <span>{downvotes}</span>
// //     //     //         </a>
// //     //     //       </li>
// //     //     //       <li>
// //     //     //         <a href="#!">
// //     //     //           <i className="fas fa-thumbs-up"></i>
// //     //     //           <span>{upvotes}</span>
// //     //     //         </a>
// //     //     //       </li>
// //     //     //       {/* {status !== "Published" && (
// //     //     //         <button className="btn btn-primary bg-slate-500" onClick={onEdit}>
// //     //     //           Edit
// //     //     //         </button>
// //     //     //       )} */}
// //     //     //     </ul>
// //     //     //   </div>
// //     //     // </article>

// //     //   );
// //     // };
// //     // //   );
// //     // // };

// //     // export default BlogCard;
// //     <div className="product-card" onClick={handleClick}>
// //       <div className="badge">{status}</div>
// //       {status !== "Published" && (
// //         <button className="btn btn-primary bg-slate-500" onClick={onEdit}>
// //           Edit
// //         </button>
// //       )}
// //       <div className="product-tumb">
// //         <img src={imageUrl} alt="" />
// //       </div>
// //       <div className="product-details">
// //         <span className="product-catagory">{category}</span>
// //         <h4>
// //           <a href="/">{title}</a>
// //         </h4>
// //         <p className="text-black">
// //           {content}
// //           {`...`}
// //         </p>
// //         <Link to={`/blog/getBlogs/${id}`} className="post-link">
// //           Read More
// //         </Link>
// //         <div className="product-bottom-details">
// //           <div className="product-price   ">
// //             {/* <img src={} alt="Profile Image" /> */}

// //             <BiUserCircle />
// //             {author}
// //           </div>

// //           <div className="product-links flex flex-row gap-6">
// //             <p className="h-2 font-semibold flex flex-row gap-2">
// //               <FaHeart size={24} />
// //               {upvotes}
// //             </p>
// //             {/* <FaThumbsDown size={24} />
// //         {downvotes.length} */}
// //             <p className="h-2 font-semibold flex flex-row gap-2">
// //               <BiCommentDots size={24} />
// //               {comments}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default BlogCard;

// // ----------------------------------------------------------------------
// import React from "react";
// import "./RectangularBlogCard.css"; // Import CSS file for styling
// import { BiEdit } from "react-icons/bi";
// const RectangularBlogCard = ({
//   id,
//   date,
//   title,
//   author,
//   comments,
//   imageUrl,
//   content,
//   followers,
//   following,
//   downvotes,
//   upvotes,
//   onReadMore,
//   onEdit,
//   status,
// }) => {
//   const handleClick = () => {
//     if (status === "Draft") {
//       // If blog status is "Draft", prevent both reading more and editing
//       console.log("blog is drafted");
//       return;
//     } else {
//       // Redirect to the individual blog page
//       onReadMore();
//     }
//   };

//   return (
//     <article className="rectangular-blog-card" onClick={handleClick}>
//       <div className="rectangular-blog-card-img">
//         <img src={imageUrl} alt="Blog Cover" />
//       </div>
//       <div className="rectangular-blog-card-content">
//         <div className="flex flex-col justify-around">
//           <h3 className="rectangular-blog-card-title text-slate-600 font-bold uppercase">
//             {title}
//           </h3>
//           <p className="">
//             {" "}
//             {status === "Draft" && ( // Render edit icon if status is "Draft"
//               <BiEdit
//                 id={id}
//                 className="edit-icon"
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent the onClick event from bubbling up to the card
//                   onEdit(id, status);
//                 }}
//               />
//             )}
//           </p>
//         </div>
//         <p className="rectangular-blog-card-excerpt text-slate-600 font-serif ">
//           {content}
//         </p>
//         <span className="rectangular-blog-card-date font-semibold ">
//           {date}
//         </span>
//       </div>
//     </article>
//   );
// };

// export default RectangularBlogCard;
import React from "react";
import "./RectangularBlogCard.css"; // Import CSS file for styling
import { BiEdit } from "react-icons/bi";

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
}) => {
  const handleClick = () => {
    if (status === "Draft") {
      console.log("blog is drafted");
      return;
    } else {
      onReadMore();
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
        </div>
        <p className="rectangular-blog-card-excerpt text-slate-600 font-serif">
          {content}
        </p>
        <div className="rectangular-blog-card-bottom">
          <div className="flex justify-between">
            <div>
              <span className="font-semibold">
                <a href={`/profile/${author}`}>{author}</a>
              </span>
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
