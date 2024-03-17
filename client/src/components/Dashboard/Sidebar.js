import { useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setUserDetails } from "../../slices/profileSlice";
import { sidebarLinks } from "./DashboardLinks";
// import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import { logout } from "../../services/operations/authAPI";
import React from "react";
import { fetchUserDetails } from "../../services/operations/settingsAPI";
export default function Sidebar() {
  const { user, userDetails, loading, error } = useSelector((state) => ({
    user: state?.profile?.userDetails?.data,
    userDetails: state?.profile?.user,
    loading: state.profile.loading,
    error: state.profile.error,
  }));

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetailsAsync = async () => {
      setLoading(true);

      try {
        const response = await fetchUserDetails(token);
        // Update the user's state in Redux
        dispatch(setUserDetails(response)); // Assuming response contains user details
        setLoading(false);
      } catch (error) {
        console.log("error in fetching user details");
        setLoading(false);
      }
    };

    fetchUserDetailsAsync();
  }, [dispatch, token]);
  const { authLoading } = useSelector((state) => state.auth);
  // to keep track of confirmation modal

  const [confirmationModal, setConfirmationModal] = useState(null);
  console.log("user", user);
  console.log("prop of user", userDetails);
  if (loading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }
  console.log("user in sidebar", user);
  return (
    <>
      <div className=" my-5 flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-slate-500 text-black  py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            // if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
          {/* adding dyanamic user's my profile link */}
          {user !== undefined && (
            <SidebarLink
              key="myProfileLink"
              link={{
                id: "myProfile",
                name: "My Profile",
                path: `/auth/getUserByUsername/${user?.username}`, // Assuming username is a property of the user object
              }}
              iconName="VscFile"
            />
          )}
          {/* {userDetails && user === undefined && (
            <SidebarLink
              key="myProfileLink"
              link={{
                id: "myProfile",
                name: "My Profile",
                path: `/auth/getUserByUsername/${userDetails?.username}`, // Assuming username is a property of the user object
              }}
              iconName="VscFile"
            />
          )} */}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-black" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-black"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
