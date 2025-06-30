import { FieldError, Message } from "react-hook-form";

export interface UserType {
  _id: string;
  username: string;
  email: string;
  projects: string[];
  teams: string[];
}

export interface ModalPropTypes {
  isOpen: boolean;
  onClose: () => void;
}

export interface TeamModalPropTypes extends ModalPropTypes {
  team: TeamType;
}

export interface TeamType {
  _id: string;
  name: string;
  description: string;
  admin: UserType;
  members: UserType[];
  projects: string[];
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
  tasks: string[];
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
