import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
const BlogForm = ({
  handleSubmit,
  register,
  errors,
  categoryOptions,
  statusOptions,
  submitText,
  onSubmit,
  content,
  setContent,
}) => {
  const navigate = useNavigate();
  const editor = useRef(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-slate-100 p-8 px-12">
        <h2 className="text-lg font-semibold text-black">Blog Information</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="lable-style">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Blog Title"
              className="form-style"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="-mt-1 text-[12px] text-red-900">
                Please enter a title.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="lable-style">
              Content
            </label>
            {/* <textarea
              name="content"
              id="content"
              placeholder="Enter Blog Content"
              className="form-style"
              {...register("content", { required: true })}
            /> */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <JoditEditor
              ref={editor}
              value={content}
              // config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => {}} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setContent(newContent)}
              name="content"
            />
            {errors.content && (
              <span className="-mt-1 text-[12px] text-red-900">
                Please enter content.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="lable-style">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="form-style"
              {...register("category", { required: true })}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="-mt-1 text-[12px] text-red-900">
                Please select a category.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="lable-style">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="form-style"
              {...register("status", { required: true })}
            >
              <option value="">Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <span className="-mt-1 text-[12px] text-red-900">
                Please select a status.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="lable-style">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Enter Tags (comma separated)"
              className="form-style"
              {...register("tags")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="coverImg" className="label-style">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="coverImg"
              id="coverImg"
              className="form-style"
              {...register("coverImg", { required: true })}
            />
            {errors.coverImg && (
              <span className="-mt-1 text-[12px] text-red-900">
                Please upload a cover image.
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/blog/getMyBlogs")}
          className="cursor-pointer rounded-md bg-slate-500 py-2 px-5 font-semibold text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-slate-500 py-2 px-5 font-semibold text-white"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
