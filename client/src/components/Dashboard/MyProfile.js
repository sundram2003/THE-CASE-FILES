import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { ACCOUNT_TYPE } from "../../utils/constant";
import { formattedDate } from "../../utils/formattedDate";
import { fetchUserDetails } from "../../services/operations/settingsAPI";
import { setLoading } from "../../slices/profileSlice";

export default function MyProfile() {
  // let userDetails = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "johndoe@example.com",
  //   follower: 100,
  //   following: 200,
  //   blogs: 10,
  //   additionalDetails: {
  //     about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     gender: "Male",
  //   },
  // };
  //   let user = {
  //     dummy: "dummy value",
  //   };
  const { user, userDetails, loading, error } = useSelector((state) => ({
    user: state.profile.user,
    userDetails: state.profile.user.additionalDetails,
    loading: state.profile.loading,
    error: state.profile.error,
  }));
  // const { user } = useSelector((state) => state.profile);
  console.log("user", user);
  console.log("userDetails", userDetails);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ...
  console.log("token", token);

  useEffect(() => {
    setLoading(true);
    try {
      dispatch(fetchUserDetails(token));
      setLoading(false);
    } catch (error) {
      console.log("error in fetching user details");
    }
  }, [dispatch, token]);

  return (
    <div className="">
      <h1 className="mb-10 text-3xl font-medium text-black py-5  px-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px]  p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={userDetails?.profileImg}
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
            <p>{user?.follower?.length}</p>
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
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
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
                {user?.email}
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
            {/* {(user.accountType === ACCOUNT_TYPE.STUDENT ||
              user.accountType === ACCOUNT_TYPE.MESS_COMMITEE) && (
              <div>
                <p className="mb-2 text-sm text-green-100">Branch</p>
                <p className="text-sm font-medium text-white">
                  {userDetails?.additionalDetails?.branch ?? "Add Your Branch"}
                </p>
              </div>
            )} */}

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
