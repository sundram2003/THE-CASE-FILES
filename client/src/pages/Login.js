import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Footer from "../components/common/Footer";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI"; // Assuming you have a login function
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading animation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true); // Start loading animation
    try {
      await dispatch(login(email, password, navigate));
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    // <section
    //   className="vh-100 h-full"
    //   style={{
    //     backgroundImage: `url('https://wallpapers.com/images/high/8k-iphone-221b-baker-street-sherlock-holmes-kpcxul3vom1gts32.webp')`,
    //   }}
    // >
    //   {/* Your content goes here */}
    <section
      className="bg-gray-100 h-screen vh-100 flex "
      style={{
        backgroundImage: `url('https://wallpapers.com/images/high/8k-iphone-221b-baker-street-sherlock-holmes-kpcxul3vom1gts32.webp')`,
      }}
    >
      <div className="max-w-fit mx-auto px-3 bg-white rounded-lg shadow-md flex">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-semibold mb-4 py-8">Welcome Back!</h2>
          <p className="text-gray-600 mb-8">
            Log in to your account and start exploring.
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4 flex items-center border border-gray-300 rounded-md px-4 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                className="w-full focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div className="mb-6 flex items-center border border-gray-300 rounded-md px-4 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                className="w-full focus:outline-none"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-400" />
                ) : (
                  <AiOutlineEye className="text-gray-400" />
                )}
              </span>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-3xl font-semibold mb-4 py-12">About CredLock</h2>
          <p className="text-gray-600 mb-8">
            Welcome to CredLock, where we illuminate the shadows that sometimes
            cloud the realities of college life. Here, we shed light on the
            legal and ethical dimensions of student conduct, guiding you through
            the educational landscape with clarity and understanding. Our
            mission extends beyond mere awareness; we provide a platform where
            students can share experiences, gain insights, and navigate
            potential legal implications seamlessly. Join us in unlocking the
            keys to success in your college journey.
          </p>
          <Link
            to="/register"
            className="text-blue-500 hover:underline inline-block"
          >
            Don't have an account? Register now!
          </Link>
        </div>
      </div>
    </section>
    // </section>
  );
};

export default Login;
