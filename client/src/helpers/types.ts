import { FieldError, Message } from "react-hook-form";

export interface UserType {
  _id: string;
  username: string;
  email: string;
  projects: ProjectType[];
  teams: TeamType[];
}

export interface TeamType {
  _id: string;
  name: string;
  description: string;
  members: {
    user: UserType;
    role: string;
  }[];
  projects: ProjectType[];
}

export enum ProjectStatusType {
  ACTIVE = "active",
  COMPLETED = "completed",
  ON_HOLD = "on-hold",
}

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatusType;
  tasks: TaskType[];
}

export enum TaskPriorityType {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
export enum TaskStatusType {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}
export interface TaskType {
  _id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  assignedTo: UserType | undefined;
}

export interface TaskWithProjectType extends TaskType {
  project: ProjectType;
}

export interface GroupedTasksListType {
  todo: {
    tasks: TaskWithProjectType[];
    count: number;
  };
  "in-progress": {
    tasks: TaskWithProjectType[];
    count: number;
  };
  done: {
    tasks: TaskWithProjectType[];
    count: number;
  };
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
