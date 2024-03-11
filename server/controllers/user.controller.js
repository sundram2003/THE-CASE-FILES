import { User } from "../models/user.model";


export const followUser = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const { userToFollow } = req.body;
    const loggedInUserDetails = await User.findById(loggedInUser);
    const userToFollowDetails = await User.findById(userToFollow);
    if (!userToFollowDetails || userToFollowDetails === null || userToFollowDetails === undefined) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    if (loggedInUser.following.includes(userToFollow)) {
      return res.status(403).json({
        sucess: false,
        message: "Already following the user"
      });
    }
    loggedInUserDetails.following.push(userId);
    userToFollowDetails.followers.push(req.userId);
    await loggedInUserDetails.save();
    await userToFollowDetails.save();
    res.status(200).json({
      sucess: true,
      message: "User followed successfully"
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const unfollowUser = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const { userToUnfollow } = req.body;
    const loggedInUserDetails = await User.findById(loggedInUser);
    const userToUnfollowDetails = await User.findById(userToUnfollow);
    if (!userToUnfollowDetails || userToUnfollowDetails === null || userToUnfollowDetails === undefined) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    if (!loggedInUserDetails.following.includes(userToUnfollow)) {
      return res.status(403).json({
        sucess: false,
        message: "Not following the user"
      });
    }
    loggedInUserDetails.following.pull(userToUnfollow);
    userToUnfollowDetails.followers.pull(loggedInUser);
    await loggedInUserDetails.save();
    await userToUnfollowDetails.save();
    res.status(200).json({
      sucess: true,
      message: "User unfollowed successfully"
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
