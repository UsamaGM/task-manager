import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
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
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
      },
    ],
    projects: {
      type: Array<mongoose.Types.ObjectId>,
      ref: "Projects",
      default: [],
    },
  },
  { timestamps: true }
);

teamSchema.index({ "members.user": 1 });

const Team = mongoose.model("Teams", teamSchema);

export default Team;
