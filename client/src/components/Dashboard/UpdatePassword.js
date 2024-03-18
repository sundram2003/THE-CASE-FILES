import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { resetPassword } from "../../services/operations/authAPI";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const { token } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  // console.log("update password token", token);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    console.log("token inside the update pass", token);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <>
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              Choose new password
            </h1>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-black">
              Almost done. Enter your new password and you'r all set
            </p>
            <form onSubmit={handleOnSubmit}>
              <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-800">
                  New Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="form-style w-full !pr-10"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiFillEye fontSize={24} fill="#AFB2BF" />
                  )}{" "}
                </span>
              </label>
              <label className="relative mt-3 block">
                {/* add a superscript* */}
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-800">
                  Confirm New Password <sup className="text-red-500"></sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="form-style w-full !pr-10"
                />

                <span
                  onClick={() => setshowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiFillEye fontSize={24} fill="#AFB2BF" />
                  )}{" "}
                  {/* Make all necessary fields */}
                </span>
              </label>
              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] bg-yellow-500 py-[12px] px-[12px] font-medium text-slate-900"
              >
                Reset Password
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/login">
                <p className="flex items-center gap-x-2 text-black ">
                  <BiArrowBack />
                  Back to Login
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
