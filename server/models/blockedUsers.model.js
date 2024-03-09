import mongoose from "mongoose";

const blockedUsersSchema = new mongoose.Schema({
  email: [{
    type: String,
    required: true,
  }],
});
export const BlockedUsers = mongoose.model("BlockedUsers", blockedUsersSchema);
