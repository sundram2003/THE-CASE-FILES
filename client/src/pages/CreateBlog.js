import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../slices/blogSlice";
import IconBtn from "../components/common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import JoditEditor from "jodit-react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { createBlog, getAllCategory } from "../services/operations/blogAPI";
import { htmlToText } from "html-to-text";
const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //get all category
    const fetchAllCategory = async () => {
      console.log("get all category");
      try {
        const response = await getAllCategory(null);
        console.log("response", response);
        setCategories(response.categories);
      } catch (error) {
        console.error("Error fetching all categories:", error);
      }
    };
    fetchAllCategory();
  }, []);

  const onSubmit = async (blogData) => {
    const formData = new FormData();
    console.log("BlogData", blogData);
    formData.append("title", blogData.title);
    formData.append("content", content);
    formData.append("status", blogData.status);
    formData.append("category", blogData.category);
    formData.append("tags", tags.join(","));
    formData.append("coverImg", blogData.coverImg[0]); // assuming coverImg is a file input
    console.log("Blog Data", blogData);
    setLoading(true);
    try {
      const result = await createBlog(formData, token);
      console.log("result1", result);
      dispatch(addBlog(result)); // Assuming result contains the newly created blog data
      console.log("result of add blog", addBlog);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
    setLoading(false);
  };
  console.log("categoriesss", categories);
  // const config = useMemo(
  //   {
  //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //     placeholder: placeholder || "Start typings...",
  //   },
  //   [placeholder]
  // );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-slate-800 bg-white p-6 space-y-8"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="title">
          Blog Title<sup className="text-red-800">*</sup>
        </label>
        <input
          id="title"
          placeholder="Enter Blog Title"
          {...register("title", { required: true })}
          className="form-style w-full border-slate-500"
        />
        {errors.title && (
          <span className="ml-2 text-xs tracking-wide text-red-800">
            Blog Title is Required*
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          className="text-sm border-slate-400 text-black-5"
          htmlFor="content"
        >
          Blog Content<sup className="text-red-900">*</sup>
        </label>
        {/* <textarea
          id="content"
          placeholder="Enter Blog Content"
          {...register("content", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        /> */}
        <JoditEditor
          ref={editor}
          value={content}
          // config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
          name="content"
        />
        {errors.content && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Blog Content is required**
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="status">
          Status<sup className="text-red-900">*</sup>
        </label>
        <select
          id="status"
          {...register("status", { required: true })}
          className="form-style w-full"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        {errors.status && (
          <span className="ml-2 text-xs tracking-wide text-red-900">
            Status is required**
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="category">
          Category<sup className="text-red-900">*</sup>
        </label>
        <select
          id="category"
          {...register("category", { required: true })}
          className="form-style w-full"
        >
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {/* <input
          id="category"
          placeholder="Enter Category"
          {...register("category", { required: true })}
          className="form-style w-full"
        /> */}
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-red-900">
            Category is required**
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="tags">
          Tags<sup className="text-red-900">*</sup>
        </label>
        <ReactTagInput
          id="tags"
          placeholder="Enter Tags"
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
        />
        {errors.tags && (
          <span className="ml-2 text-xs tracking-wide text-red-900">
            Tags are required**
          </span>
        )}
      </div>

      {/* File upload for cover image */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coverImg">
          Cover Image<sup className="text-red-900">*</sup>
        </label>
        <input
          type="file"
          id="coverImg"
          {...register("coverImg", { required: true })}
          className="form-style"
        />
        {errors.coverImg && (
          <span className="ml-2 text-xs tracking-wide text-red-900">
            Cover Image is required**
          </span>
        )}
      </div>

      {/* <button
        type="submit"
        className="text-black p-2 bg-slate-500 rounded-md mt-2"
      >
        Submit
      </button> */}
      <div className="flex justify-end gap-x-2">
        <IconBtn disabled={loading} text={"Submit"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CreateBlog;
