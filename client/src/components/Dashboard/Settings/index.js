import React from "react";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
// import UpdatePassword from "../UpdatePassword";
// import DeleteAccount from "./DeleteAccount";
import UpdatePassword from "./UpdatePassword";
const index = () => {
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-slate-800">
        Edit Profile
      </h1>
      {/* Profile */}
      <EditProfile />
      {/* EditPassword */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  );
};

export default index;
