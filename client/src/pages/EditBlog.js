import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateBlog, getSingleBlog } from "../services/operations/blogAPI";
import BlogForm from "../components/common/BlogForm";
import { useNavigate, useParams } from "react-router-dom";
import { htmlToText } from "html-to-text";
const categoryOptions = ["Education", "Crime"];
const statusOptions = ["Draft", "Published"];
const EditBlog = () => {
  const { blogId } = useParams();
  const [content, setContent] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("blog id", blogId);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  //   const previousCategory = useSelector((state) => state.blog.previousCategory);
  //   setValue("previousCategory", previousCategory);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await getSingleBlog(blogId, token);
        console.log("response in editBlog for fetching single blog", response);
        if (response) {
          const blog = response.data;
          setValue("title", blog.title);
          // setContent(htmlToText(content));
          console.log("value of content", blog.content);
          console.log("type of content", typeof blog.content);
          // setContent(blog.content);
          setValue("content", blog.content);
          console.log("content", blog.content);
          setValue("status", blog.status);
          setValue("prevCategory", blog.category); // Set previous category
          setValue("category", blog.category); // Set current category
          setValue("tags", blog.tags.join(","));
          setValue("coverImg", blog.coverImg); // Set the value for coverImg field
        }
      } catch (error) {
        console.log("Error fetching blog by id:", error);
      }
    };
    getBlog();
  }, [token, dispatch]);
  console.log("content last", content);
  const submitBlogForm = async (data) => {
    console.log("data", data);
    let coverImgData = data.coverImg ? data.coverImg[0] : null;
    const result = await updateBlog(
      blogId,
      data.title,
      content,
      data.status,
      data.category,
      data.prevCategory, // Pass prevCategory to updateBlog function
      data.tags.split(",").map((tag) => tag.trim()),
      coverImgData,
      token
    );
    console.log("result in updated blog", result);
    if (result) {
      console.log("Blog edited successfully:", result);
      navigate(`/blog/getBlogs/${blogId}`);
    } else {
      console.log("Error editing blog.");
    }
  };

  return (
    <>
      <BlogForm
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        categoryOptions={categoryOptions}
        statusOptions={statusOptions}
        submitText="Save"
        onSubmit={submitBlogForm}
        // content={
        // <div
        //   dangerouslySetInnerHTML={{
        //     __html: content,
        //   }}
        // />
        // }

        content={content}
        setContent={setContent}
      />
    </>
  );
};

export default EditBlog;
