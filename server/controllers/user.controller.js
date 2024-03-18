import { Blog } from "../models/blogs.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comments.model.js";
import { AdditionalDetails } from "../models/additionalDetails.schema.js";
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
export const addModerator = async (req, res) => {
  try {
    ///get username
    //find user by username
    //add moderator role
    //save user
    //return response
    const { username } = req.body;
    const user = await User.findOne({ username });
    user.isModerator = true;
    user.save();

    res.status(200).json({
      success: true,
      message: "User is now a moderator",
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
}
export const removeModerator = async (req, res) => {
  try {
    //get username
    //find user by username and remove moderator role
    //return response
    const { username } = req.body;
    const user = await User.findOne({ username });
    user.isModerator = false;
    user.save();
    return res.status(200).json({
      success: true,
      message: "User is no longer a moderator",
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
}
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    //find user by username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //delete its all blog
    const deletedBlog = await Blog.deleteMany({
      createdBy: user._id,
    })
    //delete its all comment
    const deletedComment = await Comment.deleteMany({
      createdBy: user._id,
    })
    //delete its all following
    const deletedFollowing = await User.updateMany(
      { following: user._id },
      { $pull: { following: user._id } }
    )
    //delete its all followers
    const deletedFollowers = await User.updateMany(
      { followers: user._id },
      { $pull: { followers: user._id } }
    )
    //delete its additional details 
    const deletedAdditionalDetails = await AdditionalDetails.deleteOne({
      user: user._id,
    })
    //delete user
    const deletedUser = await User.deleteOne({ _id: user._id });
    //return res
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
}
