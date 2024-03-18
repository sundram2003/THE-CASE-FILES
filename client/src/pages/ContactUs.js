import React from "react";
import Footer from "../components/common/Footer";

const ContactUs = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center text-black">
        <h1 className="mt-5 text-3xl font-bold">Contact Us</h1>
        <div className="flex flex-col justify-center items-center p-4">
          <div className="bg-gray-200 p-8 rounded-md shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 p-2 rounded-md border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 p-2 rounded-md border border-gray-300"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 rounded-md border border-gray-300"
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full p-2 rounded-md border border-gray-300"
              ></textarea>
            </form>
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
