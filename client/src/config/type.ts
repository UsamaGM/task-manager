export interface TaskType {
  name: string;
  project: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}

export interface ProjectType {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "on-hold";
  tasks: Array<TaskType>;
}
