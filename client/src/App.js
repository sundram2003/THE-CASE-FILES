import React from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/common/Navbar";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import { Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Error from "./pages/Error";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/AuthRoute/PrivateRoute";
import MyProfile from "./components/Dashboard/MyProfile";
import { VerifyEmail } from "./pages/verifyEmail";
import Settings from "../src/components/Dashboard/Settings";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import IndividualBlog from "./pages/IndividualBlogs";
import EditBlog from "./pages/EditBlog";
import ContactUs from "./pages/ContactUs";
import UserProfile from "./pages/UserProfile";
import Blogs from "./pages/Blogs";
import SearchBlogs from "./components/common/SearchBlogs";
import ForgotPassword from "./components/Dashboard/Settings/ForgotPassword";
import UpdatePassword from "./components/Dashboard/UpdatePassword";
import Analaytics from "./pages/Analaytics";
function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/getBlogsByTitle/:title" element={<SearchBlogs />} />
        <Route
          element={
            // <PrivateRoute>
            <Dashboard />
            // </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="dashboard/Settings" element={<Settings />}></Route>
          <Route path="/dashboard/add-blog" element={<CreateBlog />}></Route>
          <Route path="/blog/getMyBlogs" element={<MyBlogs />}></Route>
          <Route path="/blog/getBlogs/:id" element={<IndividualBlog />} />
          <Route path="/blog/update/:blogId" element={<EditBlog />} />
          <Route
            path="/auth/getUserByUsername/:username"
            element={<UserProfile />}
          />
          <Route path="/auth/userAnalytics" element={<Analaytics />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
