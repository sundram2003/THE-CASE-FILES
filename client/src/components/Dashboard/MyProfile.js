import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { ACCOUNT_TYPE } from "../../utils/constant";
import { formattedDate } from "../../utils/formattedDate";
import { fetchUserDetails } from "../../services/operations/settingsAPI";
import { setLoading, setUserDetails } from "../../slices/profileSlice";
import React from "react";
export default function MyProfile() {
  // const { user, userDetails, loading, error } = useSelector((state) => ({
  //   user: state.profile,
  //   userDetails: state.profile,
  //   loading: state.profile.loading,
  //   error: state.profile.error,
  // }));
  // // const { user } = useSelector((state) => state.profile);

  // const { token } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // // ...
  // console.log("token", token);

  // useEffect(() => {
  //   const fetchUserDetailsAsync = async () => {
  //     setLoading(true);

  //     try {
  //       const response = await fetchUserDetails(token);
  //       // Handle the response data here
  //       console.log("response in fetching user details", response);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("error in fetching user details");
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserDetailsAsync();
  // }, [dispatch, token]);
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

  if (loading) {
    // Return a loading indicator until user details are fetched
    return <div>Loading...</div>;
  }

  console.log("user", user);
  console.log("userDetails", userDetails);

  return (
    <div className="">
      <h1 className="mb-10 text-3xl font-medium text-black py-5  px-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px]  p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.additionalDetails?.profileImg}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-slate-800">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-slate-800">{user?.email}</p>
          </div>
          <div className="flex flex-row gap-1 p-1">
            <h2>Follower</h2>
            <p>{user?.followers?.length}</p>
          </div>
          <div className="flex flex-row gap-1 p-1">
            {" "}
            <h2> Following</h2>
            <p>{user?.following?.length}</p>
          </div>
          <div className="flex flex-row gap-1 p-1">
            <p>{user?.blogs?.length}</p>
            <h2>Blogs</h2>
          </div>
        </div>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-black-200 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-black">About</p>

          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            userDetails?.about ? "text-slate-600" : "text-slate-500"
          } text-sm font-medium`}
        >
          {userDetails?.about ?? "Write Something About Yourself"}
        </p>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-slate-800">First Name</p>
              <p className="text-sm font-medium text-slate-600">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-800">Email</p>
              <p className="text-sm font-medium text-slate-600">
                {user?.username}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-800">Gender</p>
              <p className="text-sm font-medium text-slate-600">
                {userDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-slate-800">Last Name</p>
              <p className="text-sm font-medium text-slate-600">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-800">Phone Number</p>
              <p className="text-sm font-medium text-slate-600">
                {userDetails?.contactNo ?? "Add Contact Number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-800">
                Date Of Birth
              </p>
              <p className="text-sm font-medium text-slate-600">
                {formattedDate(userDetails?.DOB) ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
