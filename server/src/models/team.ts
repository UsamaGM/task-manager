import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  members: {
    type: Array<mongoose.Types.ObjectId>,
    ref: "Users",
    default: [],
  },
  projects: {
    type: Array<mongoose.Types.ObjectId>,
    ref: "Projects",
    default: [],
  },
});

const Team = mongoose.model("Teams", teamSchema);

export default Team;
