import React from "react";
import Footer from "../components/common/Footer";

import aboutusbck from "../assets/images/CredLock_Aboutsus.jpeg";
import first from "../assets/images/first.png";
import sec from "../assets/images/sec.png";
import third from "../assets/images/third.png";
const AboutUs = () => {
  return (
    <div style={{ backgroundImage: `url(${sec})` }}>
      <div className="flex flex-col justify-center items-center text-center text-black h-full  ">
        <h1 className="mt-5 text-3xl font-bold">About CredLock</h1>
        <div className="flex flex-col justify-center items-center p-4">
          <p className="my-4 text-2xl text-semibold  font-serif">
            {/* CredLock is dedicated to empowering college minds by providing
            valuable educational resources and fostering a community where
            students can learn from each other's experiences. */}
            Welcome to CredLock, a thriving haven for the vibrant minds of
            college students on their educational journey. Our mission is deeply
            rooted in the belief that true empowerment comes not just from
            academic excellence but also from a supportive community that
            nurtures personal growth and development.
          </p>
          <p className="my-4 text-xl font-semibold">
            Imagine a platform where the air is charged with intellectual
            curiosity, a place where the pursuit of knowledge is not just a
            solitary endeavor but a shared experience. CredLock stands as a
            beacon for aspiring minds, offering a treasure trove of valuable
            educational resources that go beyond the confines of textbooks.
          </p>
          <p className="my-4 text-xl font-bold">
            At CredLock, our commitment extends beyond academic support and
            personal growth; we recognize the importance of equipping students
            with knowledge about potential pitfalls. Our platform goes beyond
            the conventional, delving into the often unspoken realm of potential
            consequences resulting from illegal acts within the college
            environment.
          </p>
          <p className="my-5 text-xl font-bold ">
            Through the lens of shared experiences, CredLock aims to educate and
            empower students by fostering an open dialogue about the legal
            aspects of college life. By highlighting the potential ramifications
            of certain actions, we strive to create a community that is not only
            academically enriched but also socially conscious and legally
            informed.
          </p>
          <p className="my-7 text-lg font-bold">
            Join us at CredLock, where knowledge is not just a tool for academic
            success but also a shield against the potential pitfalls that can
            arise from unawareness. Together, we embark on a journey to empower
            college minds with the comprehensive understanding needed to
            navigate the educational landscape responsibly and ethically.
          </p>
        </div>
        <div className="flex flex-col items-center mt-3">
          <img
            src={aboutusbck}
            alt="aboutpage_bg"
            className="h-90 w-[500px] object-cover rounded-md border-spacing-3"
          />
        </div>
        <div className="flex justify-center mt-8 mb-12 space-x-4">
          <DeveloperBox
            Name="Sundram Mishra"
            role="Backend Developer"
            from="MNNIT"
          />
          <DeveloperBox
            Name="Dipti Kumari"
            role="Frontend Developer"
            from="MNNIT"
          />
          <DeveloperBox
            Name="Akshat Verma"
            role="Full Stack Developer"
            from="MNNIT"
          />
          <DeveloperBox Name="Ayati" role="CSS and ML Developer" from="MNNIT" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const DeveloperBox = ({ Name, role, from }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md w-56 h-full">
      <h2 className="text-xl font-semibold">{Name}</h2>
      <p className="text-sm">{role}</p>
      <p className="text-sm">{from}</p>
    </div>
  );
};

export default AboutUs;
