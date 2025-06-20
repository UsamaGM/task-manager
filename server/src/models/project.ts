import mongoose from "mongoose";
import type { TaskType } from "./task";

const projectSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "on-hold"],
    default: "active",
  },
  tasks: {
    type: Array<mongoose.Types.ObjectId>,
    ref: "Tasks",
    default: [],
  },
});

const Project = mongoose.model("Projects", projectSchema);
export default Project;

export type ProjectStatusType = "active" | "completed" | "oh-hold";

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatusType;
  tasks: Array<TaskType>;
}
