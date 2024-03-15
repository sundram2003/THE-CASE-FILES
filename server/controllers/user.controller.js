import { User } from "../models/user.model.js";

export const followUser = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const { username } = req.body;
    const loggedInUserDetails = await User.findById(loggedInUser);
    const userToFollowDetails = await User.findOne({ username });
    console.log("loggedINUserDetails: ", loggedInUserDetails);
    console.log("userTofollowDetails: ", userToFollowDetails);
    if (
      !userToFollowDetails ||
      userToFollowDetails === null ||
      userToFollowDetails === undefined
    ) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (loggedInUser == userToFollowDetails._id) {
      return res.status(400).json({
        success: false,
        message: "User Cannot follow himself",
      });
    }
    if (loggedInUserDetails.following.includes(userToFollowDetails._id)) {
      return res.status(403).json({
        success: false,
        message: "Already following the user",
      });
    }
    loggedInUserDetails.following.push(userToFollowDetails._id);
    userToFollowDetails.followers.push(loggedInUser);
    await loggedInUserDetails.save();
    await userToFollowDetails.save();
    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
export const unfollowUser = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const { username } = req.body;
    const loggedInUserDetails = await User.findById(loggedInUser);
    const userToUnfollowDetails = await User.findOne({ username });
    if (
      !userToUnfollowDetails ||
      userToUnfollowDetails === null ||
      userToUnfollowDetails === undefined
    ) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!loggedInUserDetails.following.includes(userToUnfollowDetails._id)) {
      return res.status(403).json({
        success: false,
        message: "Not following the user",
      });
    }
    loggedInUserDetails.following.pull(userToUnfollowDetails._id);
    userToUnfollowDetails.followers.pull(loggedInUserDetails._id);
    await loggedInUserDetails.save();
    await userToUnfollowDetails.save();
    res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
export const getUserByUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .populate("blogs")
      .populate("additionalDetails")
      .select("-password")
      .exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
