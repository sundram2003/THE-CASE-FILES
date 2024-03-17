import React, { useEffect, useState } from "react";
import "../utils/profile.css";
import {
  followUser,
  getUserByUsername,
  unfollowUser,
} from "../services/operations/settingsAPI";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setUserDetails } from "../slices/profileSlice";
import {
  FaUserCheck,
  FaCoins,
  FaHeart,
  FaComment,
  FaUserPlus,
  FaUserMinus,
} from "react-icons/fa";
import { ACCOUNT_TYPE } from "../utils/constant";
import {
  addModeratorAPI,
  removeModeratorAPI,
} from "../services/operations/blogAPI";
import { setUserDetails } from "../slices/profileSlice";
function UserProfile() {
  const { username } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.profile);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true); // State variable for loading status
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserByUsername(username, token);
        console.log("response in fetchuser", response);
        setUser(response.user);
        setIsFollowing(response?.followers?.includes(user.username));
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log("error in fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [username, token]);
  useEffect(() => {
    setIsModerator(user?.isModerator || false);
  }, [user]);

  const followHandler = async () => {
    try {
      const response = await followUser(username, token);
      if (response.data.success) {
        setIsFollowing(true);
      }

      console.log("response in fetching user details", response);
    } catch (error) {
      console.log("error in fetching user details", error);
    }
    console.log("followed");
  };

  //unfollow handler
  const unfollowhandler = async () => {
    try {
      const response = await unfollowUser(username, token);
      console.log("response in fetching user details", response);
      if (response.data.success) setIsFollowing(false);
    } catch (error) {
      console.log("error in fetching user details", error);
    }
    console.log("unfollowed");
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }
  //addmoderator
  // const addModerator = async (username) => {
  //   // Renaming function to avoid conflict
  //   try {
  //     const response = await addModeratorAPI(username, token); // Using renamed imported function
  //     console.log("response in fetching user details", response);
  //     setIsModerator(true);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("error in adding moderator", error);
  //   }
  // };
  // const removeModerator = async () => {
  //   try {
  //     const response = await removeModeratorAPI(username, token);
  //     if (response.data.success) setIsModerator(false);
  //   } catch (error) {
  //     console.log("error in removing moderator", error);
  //   }
  // };
  const addModerator = async (username) => {
    try {
      const response = await addModeratorAPI(username, token);
      console.log("response in fetching user details", response);
      setIsModerator(true);
      setLoading(false);
    } catch (error) {
      console.log("error in adding moderator", error);
    }
  };

  const removeModerator = async () => {
    try {
      const response = await removeModeratorAPI(username, token);
      if (response.data.success) {
        setIsModerator(false);
      }
    } catch (error) {
      console.log("error in removing moderator", error);
    }
  };

  console.log("user inside userprofile", user);
  console.log("userDetails which user login", userDetails);
  return (
    <div>
      <div>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img src={user?.additionalDetails?.profileImg} alt="" />
            </div>
            <div className="profile-user-settings p-2">
              <h1 className="profile-user-name mb-2 text-sm font-serif ">
                {user?.username}
              </h1>
              {isFollowing ? (
                <button
                  className="btn profile-edit-btn"
                  onClick={unfollowhandler}
                >
                  Unfollow
                  <FaUserMinus aria-hidden="true" />
                </button>
              ) : (
                <button
                  className="btn profile-edit-btn"
                  onClick={followHandler}
                >
                  Follow
                  <FaUserPlus aria-hidden="true" />
                </button>
              )}
              <FaUserPlus aria-hidden="true" />
              {userDetails?.data?.role === ACCOUNT_TYPE.ADMIN && (
                <div>
                  {/* Button for moderator */}
                  {user?.isModerator ? (
                    <button
                      onClick={() => {
                        removeModerator(user?.username);
                      }} // Pass username as argument
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove Moderator
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addModerator(user?.username);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Moderator
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">
                    {user?.blogs?.length}
                  </span>{" "}
                  posts
                </li>

                <li>
                  <span className="profile-stat-count">
                    {user?.followers.length}
                  </span>{" "}
                  followers
                </li>
                <li>
                  <span className="profile-stat-count">
                    {user?.following?.length}
                  </span>{" "}
                  following
                </li>
              </ul>
            </div>
            <div className="profile-bio">
              <p>
                <span className="profile-real-name uppercase">
                  {user.firstName} {user.lastName}
                </span>
                {/* <li> */}
                <span className="profile-stat-count flex flex-row gap-2">
                  <FaCoins />
                  {user?.contributions} contributions
                </span>{" "}
                {/* </li> */}
                <span className="profile-stat-count flex flex-row gap-2">
                  {user?.additionalDetails?.about}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" container">
          <div className="gallery">
            {/* Render gallery items */}
            {user?.blogs.map((item) => (
              <Link to={`/blog/getBlogs/${item._id}`} key={item._id}>
                <div className="gallery-item" tabIndex="0">
                  <img src={item.coverImg} className="gallery-image" alt="" />
                  <div className="gallery-item-info flex flex-col">
                    <li className="gallery-item-likes mt-1">
                      <span className="visually-hidden ">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i>{" "}
                      {item?.title}
                    </li>
                    <ul>
                      <li className="gallery-item-likes">
                        <span className="visually-hidden font-extrabold text-black">
                          Likes:
                        </span>
                        <FaHeart aria-hidden="true" /> {item?.upvotes.length}
                      </li>

                      <li className="gallery-item-comments">
                        <span className="visually-hidden">Comments:</span>
                        <FaComment aria-hidden="true" />
                        {item?.comments.length}
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* <div className="loader"></div> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
