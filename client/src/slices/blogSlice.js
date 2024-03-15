import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    blog: null,
    blogs: [],
    error: null,
    mostVotedBlog: [],
    mostRecentBlog: [],
    title: "",
    content: "",
    coverImg: "",
    tags: "",
    category: "",
    previousCategory: "",
  },

  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },

    setPrevCategory(state, action) {
      state.previousCategory = action.payload;
    },
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setMostVotedBlog(state, action) {
      state.mostVotedBlog = action.payload;
    },
    setMostRecentBlog(state, action) {
      state.mostRecentBlog = action.payload;
    },
    setBlog(state, action) {
      state.blog = action.payload;
    },
    addBlog(state, action) {
      state.blogs.push(action.payload);
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setCoverImg(state, action) {
      state.coverImg = action.payload;
    },
    deleteBlog(state, action) {
      state.blogs = null;
    },
    downvoteBlog(state, action) {
      const blog = state.blogs.find((blog) => blog.id === action.payload);
      if (blog) {
        blog.votes--;
      }
    },
  },
});

export const {
  setBlogs,
  setSelectedBlog,
  setError,
  setMostVotedBlog,
  setMostRecentBlog,
  setBlog,
  setPrevCategory,
  addBlog,
  setTitle,
  setContent,
  setCoverImg,
  deleteBlog,
  downvoteBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
