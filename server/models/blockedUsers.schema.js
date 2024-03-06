import mongoose from "mongoose";

const blockedUsersSchema = new mongoose.Schema({
  blockedUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
});
const BlockedUsers = mongoose.model("BlockedUsers", blockedUsersSchema);
export default BlockedUsers;