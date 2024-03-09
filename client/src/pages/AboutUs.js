import React from "react";
import Footer from "../components/common/Footer";

import aboutusbck from "../assets/images/CredLock_Aboutsus.jpeg";
const AboutUs = () => {
  return (
    <div>
      <div className="flex flex-row justify-end text-black">
        <div className="flex flex-col gap-2 p-4">
          <h1 className="mt-5">CredLock is all about...</h1>
        </div>
        {/* <div className="aboutpage_bg  "> */}
        <div className=" mt-6 flex flex-row justify-items-end">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            auctor, nunc nec lacinia tincidunt, libero felis fermentum nunc,
            eget convallis libero nunc et nunc. Donec auctor, nunc nec lacinia
            tincidunt, libero felis
          </p>
          <img
            src={aboutusbck}
            alt="aboutpage_bg"
            className=" h-90 w-[500px] object-cover rounded-md border-spacing-3 "
          />
        </div>
        {/* </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
