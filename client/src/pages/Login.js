// // import React, { useState } from "react";
// // import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// // import { useDispatch } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom";
// // // import { login } from "../slices/authSlice";
// // import { login } from "../services/operations/authAPI";
// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const handleOnChange = (e) => {
// //     if (e.target.name === "email") {
// //       setEmail(e.target.value);
// //     } else if (e.target.name === "password") {
// //       setPassword(e.target.value);
// //     }
// //   };

// //   const handleLogin = (e) => {
// //     // Add your login logic here
// //     e.preventDefault();
// //     console.log("Login data", { email, password });
// //     dispatch(login(email, password, navigate));
// //   };

// //   return (
// //     <section className="vh-100 bg-image-vertical">
// //       <div className="container-fluid">
// //         <div className="row">
// //           <div className="col-sm-6 text-black">
// //             <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
// //               <form
// //                 onSubmit={handleLogin}
// //                 style={{
// //                   width: "23rem",
// //                 }}
// //               >
// //                 <h3 className="fw-normal mb-3 pb-3  text-2xl font-semibold">
// //                   Log in
// //                 </h3>
// //                 <div className="form-outline mb-4 flex flex-row gap-1 ">
// //                   <input
// //                     required
// //                     type="text"
// //                     name="email"
// //                     value={email}
// //                     className="form-control px-2 border-2 border-gray-600 mt-[15px] rounded bg-white text-black text-left w-full"
// //                     placeholder="Enter a valid email/username"
// //                     onChange={handleOnChange}
// //                     // style={{ width: "calc(100% - 4.5rem)" }}
// //                   />
// //                   <label className="form-label " htmlFor="form3Example3">
// //                     Email address
// //                   </label>
// //                 </div>
// //                 <div className="form-outline mb-4 flex flex-row gap-1 ">
// //                   <input
// //                     required
// //                     type={showPassword ? "text" : "password"}
// //                     name="password"
// //                     value={password}
// //                     onChange={handleOnChange}
// //                     placeholder="Enter Password"
// //                     className="form-control px-2 border-2 border-gray-600 rounded bg-white text-black text-left w-full"
// //                     // style={{ width: "calc(100% - 2.5rem)" }}
// //                   />
// //                   <label className="form-label" htmlFor="form3Example4">
// //                     Password
// //                   </label>
// //                   <span
// //                     onClick={() => setShowPassword((prev) => !prev)}
// //                     className="absolute  left-[290px] z-[10] cursor-pointer"
// //                   >
// //                     {showPassword ? (
// //                       <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
// //                     ) : (
// //                       <AiOutlineEye fontSize={24} fill="#AFB2BF" />
// //                     )}
// //                   </span>
// //                 </div>
// //                 <div className="pt-1 mb-4">
// //                   <button
// //                     className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2-info btn-lg btn-block"
// //                     type="submit"
// //                   >
// //                     Login
// //                   </button>
// //                 </div>
// //                 <Link to="/forgot-password">
// //                   <p className="small mb-5 pb-lg-2">
// //                     <p className="text-muted text-red-700">Forgot password?</p>
// //                   </p>
// //                 </Link>
// //                 <Link to="/register">
// //                   <p>
// //                     Don't have an account?{" "}
// //                     <p className="link-info  text-yellow-700">Register here</p>
// //                   </p>
// //                 </Link>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };
// // export default Login;

// // // import React, { useState } from "react";
// // // import { FaEnvelope, FaLock } from "react-icons/fa";
// // // import Footer from "../components/common/Footer";
// // // import { useNavigate } from "react-router-dom";
// // // import { useDispatch } from "react-redux";
// // // import { login } from "../services/operations/authAPI"; // Assuming you have a login function
// // // import toast from "react-hot-toast";
// // // import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const handleOnChange = (e) => {
// // //     if (e.target.name === "email") {
// // //       setEmail(e.target.value);
// // //     } else if (e.target.name === "password") {
// // //       setPassword(e.target.value);
// // //     }
// // //   };

// // //   const handleLogin = (e) => {
// // //     e.preventDefault();
// // //     if (!email || !password) {
// // //       toast.error("Please enter email and password.");
// // //       return;
// // //     }
// // //     dispatch(login(email, password, navigate));
// // //   };

// // //   return (
// // //     <section className="vh-100 bg-gray-200">
// // //       <div className="container h-full">
// // //         <div className="row d-flex justify-center items-center h-full">
// // //           <div className="col-lg-12 col-xl-11">
// // //             <div className="card text-black rounded-2xl">
// // //               <div className="card-body p-md-5">
// // //                 <div className="flex flex-row gap-2 justify-center">
// // //                   <div className="flex flex-col order-2 order-lg-1 lg:w-2/3">
// // //                     <p className="text-center text-3xl font-bold mb-5">
// // //                       Login
// // //                     </p>
// // //                     <form onSubmit={handleLogin} className="mx-4 lg:w-2/3">
// // //                       <div className="flex items-center mb-4">
// // //                         <FaEnvelope className="text-lg me-3" />
// // //                         <div className="form-outline flex-grow">
// // //                           <input
// // //                             type="email"
// // //                             name="email"
// // //                             value={email}
// // //                             onChange={handleOnChange}
// // //                             className="form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
// // //                             placeholder="Your Email"
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                       <div className="flex items-center mb-4">
// // //                         <FaLock className="text-lg me-3" />
// // //                         <div className="form-outline flex-grow relative">
// // //                           <input
// // //                             type={showPassword ? "text" : "password"}
// // //                             name="password"
// // //                             value={password}
// // //                             onChange={handleOnChange}
// // //                             className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
// // //                             placeholder="Password"
// // //                           />
// // //                           <span
// // //                             onClick={() => setShowPassword((prev) => !prev)}
// // //                             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
// // //                           >
// // //                             {showPassword ? (
// // //                               <AiOutlineEyeInvisible className="text-lg" />
// // //                             ) : (
// // //                               <AiOutlineEye className="text-lg" />
// // //                             )}
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                       <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
// // //                         <button
// // //                           type="submit"
// // //                           className="mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-bold text-richblack-900  hover:bg-blue-500"
// // //                         >
// // //                           Login
// // //                         </button>
// // //                       </div>
// // //                     </form>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <Footer />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Login;


// import React, { useState } from "react";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import Footer from "../components/common/Footer";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../services/operations/authAPI"; // Assuming you have a login function
// import toast from "react-hot-toast";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleOnChange = (e) => {
//     if (e.target.name === "email") {
//       setEmail(e.target.value);
//     } else if (e.target.name === "password") {
//       setPassword(e.target.value);
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error("Please enter email and password.");
//       return;
//     }
//     dispatch(login(email, password, navigate));
//   };

//   return (
//     <section className="vh-100 bg-gray-200">
//       <div className="container h-full">
//         <div className="row d-flex justify-center items-center h-full">
//           <div className="col-lg-12 col-xl-11">
//             <div className="card text-black rounded-2xl">
//               <div className="card-body p-md-5">
//                 <div className="flex flex-row gap-2 justify-center">
//                   <div className="flex flex-col order-2 order-lg-1 lg:w-2/3">
//                     <p className="text-center text-3xl font-bold mb-5">
//                       Login
//                     </p>
//                     <form onSubmit={handleLogin} className="mx-4 lg:w-2/3">
//                       <div className="flex items-center mb-4">
//                         <FaEnvelope className="text-lg me-3" />
//                         <div className="form-outline flex-grow">
//                           <input
//                             type="email"
//                             name="email"
//                             value={email}
//                             onChange={handleOnChange}
//                             className="form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
//                             placeholder="Your Email"
//                           />
//                         </div>
//                       </div>
//                       <div className="flex items-center mb-4">
//                         <FaLock className="text-lg me-3" />
//                         <div className="form-outline flex-grow relative">
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             value={password}
//                             onChange={handleOnChange}
//                             className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
//                             placeholder="Password"
//                           />
//                           <span
//                             onClick={() => setShowPassword((prev) => !prev)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                           >
//                             {showPassword ? (
//                               <AiOutlineEyeInvisible className="text-lg" />
//                             ) : (
//                               <AiOutlineEye className="text-lg" />
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
//                         <button
//                           type="submit"
//                           className="mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-bold text-richblack-900  hover:bg-blue-500"
//                         >
//                           Login
//                         </button>
//                       </div>
//                     </form>
//                     <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
//                       <Link to="/forgot-password" className="text-blue-500">
//                         Forgot password?
//                       </Link>
//                     </div>
//                     <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
//                       <p>
//                         Don't have an account?{" "}
//                         <Link to="/register" className="text-yellow-700">
//                           Register here
//                         </Link>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <Footer />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

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
    <section className="vh-100" style={{ backgroundImage: `url('https://wallpapers.com/images/high/8k-iphone-221b-baker-street-sherlock-holmes-kpcxul3vom1gts32.webp')` }}>
  {/* Your content goes here */}
      <div className="container h-full bg-url[{https://wallpapers.com/images/high/8k-iphone-221b-baker-street-sherlock-holmes-kpcxul3vom1gts32.webp}] ">
        <div className="row d-flex justify-center items-center h-full">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded-2xl">
              <div className="card-body p-md-5">
                <div className="flex flex-row gap-2 justify-center">
                  <div className="flex flex-col order-2 order-lg-1 lg:w-2/3">
                    <p className="text-center text-3xl font-bold mb-5">
                      Login
                    </p>
                    {loading && ( // Display loader if loading state is true
                      <div className="loader"></div>
                    )}
                    <form onSubmit={handleLogin} className="mx-8 lg:w-2/2">
                      <div className="flex items-center mb-8 justify-center">
                        <FaEnvelope className="text-lg me-3" />
                        <div className="form-outline flex-grow w-full">
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            className="form-control px-2 py-2 rounded-3xl border-2 border-black w-full relative"
                            placeholder="Email or Username"
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-4 justify-center">
                        <FaLock className="text-lg me-3" />
                        <div className="form-outline flex-grow w-full relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                            placeholder="Password"
                          />
                          <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible className="text-lg" />
                            ) : (
                              <AiOutlineEye className="text-lg" />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
                        <button
                          type="submit"
                          className="mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-bold text-richblack-900  hover:bg-blue-500"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
                      <Link to="/forgot-password" className="text-blue-500">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="flex justify-center mx-4 mb-[12px] mb-lg-4">
                      <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-yellow-700">
                          Register here
                        </Link>
                      </p>
                    </div>
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

export default Login;
