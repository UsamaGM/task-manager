import { FieldError, Message } from "react-hook-form";

export interface UserType {
  _id: string;
  username: string;
  email: string;
  projects: Array<ProjectType>;
}

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "on-hold";
  tasks: Array<TaskType>;
}

export interface TaskType {
  _id: string;
  name: string;
  project: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}

export type ErrorType =
  | FieldError
  | (Record<
      string,
      Partial<{
        type: string | number;
        message: Message;
      }>
    > &
      Partial<{
        type: string | number;
        message: Message;
      }>);
