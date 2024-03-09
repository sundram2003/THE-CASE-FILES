import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    // <section className="vh-100 bg-image-vertical">
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="col-sm-6 text-black">
    //         <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
    //           <form
    //             style={{
    //               width: "23rem",
    //               //   padding: "1rem",
    //               //   backgroundColor: "yellow",
    //               //   border: "2px solid darkyellow",
    //             }}
    //           >
    //             <h3 className="fw-normal mb-3 pb-3  text-2xl font-semibold">
    //               Log in
    //             </h3>
    //             <div className="form-outline mb-4 flex flex-row gap-1 ">
    //               <input
    //                 required
    //                 type="text"
    //                 name="email"
    //                 value={email}
    //                 className="form-control px-4 border-2 border-gray-600 rounded bg-white text-black text-left"
    //                 placeholder="Enter a valid email/username"
    //                 onChange={handleOnChange}
    //               />
    //               <label className="form-label" htmlFor="form3Example3">
    //                 Email address
    //               </label>
    //             </div>
    //             <div className="form-outline mb-4 flex flex-row gap-1 ">
    //               <input
    //                 required
    //                 type={showPassword ? "text" : "password"}
    //                 name="password"
    //                 value={password}
    //                 onChange={handleOnChange}
    //                 placeholder="Enter Password"
    //                 className="form-control form-control-lg px-2 border-2 border-gray-600 rounded-5"
    //               />
    //               <label className="form-label" htmlFor="form3Example4">
    //                 Password
    //               </label>
    //               <span
    //                 onClick={() => setShowPassword((prev) => !prev)}
    //                 className="absolute  left-[290px] z-[10] cursor-pointer"
    //               >
    //                 {showPassword ? (
    //                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
    //                 ) : (
    //                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
    //                 )}
    //               </span>
    //             </div>
    //             <div className="pt-1 mb-4">
    //               <button
    //                 className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2-info btn-lg btn-block"
    //                 type="button"
    //                 onClick={handleLogin}
    //               >
    //                 Login
    //               </button>
    //             </div>
    //             <p className="small mb-5 pb-lg-2">
    //               <a className="text-muted text-red-700" href="#!">
    //                 Forgot password?
    //               </a>
    //             </p>
    //             <p>
    //               Don't have an account?{" "}
    //               <a href="#!" className="link-info  text-yellow-700">
    //                 Register here
    //               </a>
    //             </p>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="vh-100 bg-image-vertical">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form
                style={{
                  width: "23rem",
                }}
              >
                <h3 className="fw-normal mb-3 pb-3  text-2xl font-semibold">
                  Log in
                </h3>
                <div className="form-outline mb-4 flex flex-row gap-1 ">
                  <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    className="form-control px-2 border-2 border-gray-600 mt-[15px] rounded bg-white text-black text-left w-full"
                    placeholder="Enter a valid email/username"
                    onChange={handleOnChange}
                    // style={{ width: "calc(100% - 4.5rem)" }}
                  />
                  <label className="form-label " htmlFor="form3Example3">
                    Email address
                  </label>
                </div>
                <div className="form-outline mb-4 flex flex-row gap-1 ">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="form-control px-2 border-2 border-gray-600 rounded bg-white text-black text-left w-full"
                    // style={{ width: "calc(100% - 2.5rem)" }}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute  left-[290px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </div>
                <div className="pt-1 mb-4">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg ml-2-info btn-lg btn-block"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <Link to="/forgot-password">
                  <p className="small mb-5 pb-lg-2">
                    <p className="text-muted text-red-700">Forgot password?</p>
                  </p>
                </Link>
                <Link to="/signup">
                  <p>
                    Don't have an account?{" "}
                    <p className="link-info  text-yellow-700">Register here</p>
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
