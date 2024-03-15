import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/operations/authAPI";
import { sendOtp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import OtpInput from "react-otp-input";
import { RxCountdownTimer } from "react-icons/rx";
import React from "react";
export function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!signupData) {
      navigate("/register");
    }
  }, []);
  const handleverifyandSignup = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, username, confirmPassword } =
      signupData;
    dispatch(
      signup(
        firstName,
        lastName,
        email,
        password,
        username,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  return (
    <section className="vh-100 bg-gray-200">
      <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        {loading ? (
          <div>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-orange-700 font-semibold text-[1.875rem] leading-[2.375rem]">
              Verify Email
            </h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-yellow-500">
              A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleverifyandSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button
                type="submit"
                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-black hover:bg-yellow-400"
              >
                Verify Email
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/register">
                <p className="text-black flex items-center gap-x-2">
                  <BiArrowBack /> Back To Signup
                </p>
              </Link>
              <button
                className="flex items-center text-blue-100 gap-x-2"
                onClick={() => dispatch(sendOtp(signupData.email))}
              >
                <RxCountdownTimer />
                Resend it
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
