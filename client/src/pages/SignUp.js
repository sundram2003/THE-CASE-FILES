import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { toast } from "react-toastify";
import { sendOtp } from "../services/operations/authAPI";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleOnChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setconfirmPassword(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    }
  };

  const handleSignUp = (e) => {
    // Add your sign-up logic here
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const newUser = {
      ...{ firstName, lastName, email, password, username, confirmPassword },
    };
    dispatch(setSignupData(newUser));
    console.log("signUp data", newUser);
    dispatch(sendOtp(email, navigate));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
    setUsername("");

    // navigate("/login");
  };

  return (
    <section className="vh-100 bg-gray-200">
      <div className="container h-full">
        <div className="row d-flex justify-center items-center h-full">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded-2xl">
              <div className="card-body p-md-5">
                <div className="flex flex-row gap-2 justify-center">
                  <div className="flex flex-col order-2 order-lg-1 lg:w-2/3">
                    <p className="text-center text-3xl font-bold mb-5">
                      Sign up
                    </p>

                    <form onSubmit={handleSignUp} className="mx-4 lg:w-2/3">
                      <div className="flex items-center mb-4 gap-1">
                        <FaUser className="text-lg me-3" />
                        <div className="form-outline flex-grow ">
                          <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                            placeholder="Your First Name"
                          />
                        </div>
                        <div className="form-outline flex-grow ">
                          <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                            placeholder="Your Last Name"
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaEnvelope className="text-lg me-3" />
                        <div className="form-outline flex-grow">
                          <input
                            type="username"
                            name="username"
                            value={username}
                            onChange={handleOnChange}
                            className="form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                            placeholder="Your Username"
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaEnvelope className="text-lg me-3" />
                        <div className="form-outline flex-grow">
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            className="form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <FaLock className="text-lg me-3" />
                        <div className="form-outline flex-grow">
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4  rounded-sm border-black w-full">
                        <FaKey className="text-lg me-3" />
                        <div className="form-outline flex-grow">
                          <input
                            type="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                            placeholder="Repeat your password"
                          />
                        </div>
                      </div>

                      <div className="form-check flex justify-center mb-5">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id="form2Example3c"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3c"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
                        <button
                          type="submit"
                          className="mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-bold text-richblack-900  hover:bg-blue-500"
                          // onClick={handleSignUp}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    {/* </form> */}
                  </div>
                  <div className=" d-flex  order-5 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
