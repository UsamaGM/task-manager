import mongoose, { type ObjectId } from "mongoose";
import type { ProjectType } from "./project";

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
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    members: {
      type: Array<mongoose.Schema.Types.ObjectId>,
      ref: "Users",
      default: [],
    },
    projects: {
      type: Array<mongoose.Types.ObjectId>,
      ref: "Projects",
      default: [],
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Teams", teamSchema);

export default Team;

export interface TeamType {
  _id: ObjectId;
  name: string;
  description: string;
  admin: ObjectId;
  memebers: ObjectId[];
  projects: ProjectType[];
}
