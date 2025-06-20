import mongoose from "mongoose";
import type { UserType } from "./user";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Tasks", taskSchema);

export default Task;

export interface TaskType {
  _id: string;
  title: string;
  subtitle: string;
  user: UserType | string;
}
