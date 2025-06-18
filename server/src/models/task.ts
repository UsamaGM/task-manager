import { type ObjectId, Schema, Types, model } from "mongoose";
import type { UserType } from "./user";

const taskSchema = new Schema({
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
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = model("Task", taskSchema);

export default Task;

export interface TaskType {
  title: string;
  subtitle: string;
  user: UserType | ObjectId;
}
