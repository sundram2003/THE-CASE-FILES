// import React from "react";
// import Footer from "../components/common/Footer";

// import aboutusbck from "../assets/images/CredLock_Aboutsus.jpeg";
// const AboutUs = () => {
//   return (
//     <div>
//       <div className="flex flex-row justify-end text-black">
//         <div className="flex flex-col gap-2 p-4">
//           <h1 className="mt-5">CredLock is all about...</h1>
//         </div>
//         {/* <div className="aboutpage_bg  "> */}
//         <div className=" mt-6 flex flex-row justify-items-end">
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//             auctor, nunc nec lacinia tincidunt, libero felis fermentum nunc,
//             eget convallis libero nunc et nunc. Donec auctor, nunc nec lacinia
//             tincidunt, libero felis
//           </p>
//           <img
//             src={aboutusbck}
//             alt="aboutpage_bg"
//             className=" h-90 w-[500px] object-cover rounded-md border-spacing-3 "
//           />
//         </div>
//         {/* </div> */}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AboutUs;
// import React from "react";
// import Footer from "../components/common/Footer";

// import aboutusbck from "../assets/images/CredLock_Aboutsus.jpeg";

// const AboutUs = () => {
//   return (
//     <div>
//       <div className="flex flex-col justify-center items-center text-center text-black">
//         <h1 className="mt-5 text-3xl font-bold">About CredLock</h1>
//         <div className="flex flex-col justify-center items-center p-4">
//           <p className="my-4">
//             CredLock is dedicated to empowering college minds by providing
//             valuable educational resources and fostering a community where
//             students can learn from each other's experiences.
//           </p>
//           <p className="my-4">
//             Our mission is to create a platform that not only offers academic
//             support but also encourages personal growth and development.
//           </p>
//           <p className="my-4">
//             At CredLock, we believe in the importance of learning from both
//             successes and failures, which is why we strive to share stories of
//             past misdemeanors and challenges faced by students.
//           </p>
//         </div>
//         <div className="flex flex-col items-center mt-6">
//           <img
//             src={aboutusbck}
//             alt="aboutpage_bg"
//             className="h-90 w-[500px] object-cover rounded-md border-spacing-3"
//           />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AboutUs;

import React from "react";
import Footer from "../components/common/Footer";

import aboutusbck from "../assets/images/CredLock_Aboutsus.jpeg";

const AboutUs = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center text-black">
        <h1 className="mt-5 text-3xl font-bold">About CredLock</h1>
        <div className="flex flex-col justify-center items-center p-4">
          <p className="my-4">
            CredLock is dedicated to empowering college minds by providing
            valuable educational resources and fostering a community where
            students can learn from each other's experiences.
          </p>
          <p className="my-4">
            Our mission is to create a platform that not only offers academic
            support but also encourages personal growth and development.
          </p>
          <p className="my-4">
            At CredLock, we believe in the importance of learning from both
            successes and failures, which is why we strive to share stories of
            past misdemeanors and challenges faced by students.
          </p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <img
            src={aboutusbck}
            alt="aboutpage_bg"
            className="h-90 w-[500px] object-cover rounded-md border-spacing-3"
          />
        </div>
        <div className="flex justify-center mt-8 space-x-4">
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
          <DeveloperBox
            Name="Ayati"
            role="Database and ML Developer"
            from="MNNIT"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const DeveloperBox = ({ name, role, from }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md w-56">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm">{role}</p>
      <p className="text-sm">{from}</p>
    </div>
  );
};

export default AboutUs;
