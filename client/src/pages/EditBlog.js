import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateBlog, getSingleBlog } from "../services/operations/blogAPI";
import BlogForm from "../components/common/BlogForm";
import { useNavigate, useParams } from "react-router-dom";

const categoryOptions = ["Education", "Crime"];
const statusOptions = ["Draft", "Published"];
const EditBlog = () => {
  const { blogId } = useParams();
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

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await getSingleBlog(blogId, token);
        console.log("response in editBlog for fetching single blog", response);
        if (response) {
          const blog = response.data;
          setValue("title", blog.title);
          setValue("content", blog.content);
          setValue("status", blog.status);
          setValue("category", blog.category);
          setValue("tags", blog.tags.join(","));
          setValue("coverImg", blog.coverImg); // Set the value for coverImg field
        }
      } catch (error) {
        console.log("Error fetching blog by id:", error);
      }
    };
    getBlog();
  }, [token, dispatch]);

  const submitBlogForm = async (data) => {
    console.log("data", data);
    const result = await updateBlog(
      blogId,
      data.title,
      data.content,
      data.status,
      data.category,
      data.tags.split(",").map((tag) => tag.trim()),
      data.coverImg,
      token
    );

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
      />
    </>
  );
};

export default EditBlog;
