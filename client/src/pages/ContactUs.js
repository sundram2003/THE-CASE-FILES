import React from "react";
import Footer from "../components/common/Footer";



const ContactUs = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center text-black">
        <h1 className="mt-5 text-3xl font-bold">Contact Us</h1>
        <div className="flex flex-col justify-center items-center p-4">
         
        </div>
        <div className="flex flex-col items-center mt-6">
          <img
            src={contactusbck}
            alt="contactpage_bg"
            className="h-90 w-[500px] object-cover rounded-md border-spacing-3"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;