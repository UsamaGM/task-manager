import mongoose, { type ObjectId } from "mongoose";
import type { UserType } from "./user";

const taskSchema = new mongoose.Schema({
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
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
  assignedTo: {
    type: String,
    required: false,
  },
});

const Task = mongoose.model("Tasks", taskSchema);

export default Task;

export type TaskPriorityType = "low" | "medium" | "high";
export type TaskStatusType = "todo" | "in-progress" | "done";

export interface TaskType {
  _id: ObjectId;
  name: string;
  description: string;
  dueDate: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  assignedTo: UserType | ObjectId;
}
