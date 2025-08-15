import { FieldError, Message } from "react-hook-form";

interface User {
  _id: string;
  username: string;
  email: string;
  projects: string[];
  profilePicture: string;
}

interface DetailedUser {
  _id: string;
  username: string;
  email: string;
  projects: Project[];
  teams: Team[];
  profilePicture: string;
}

interface Team {
  _id: string;
  name: string;
  description: string;
  admin: User;
  members: User[];
  projects: string[];
}

interface DetailedTeam {
  _id: string;
  name: string;
  description: string;
  admin: User;
  members: User[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

enum ProjectStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  ON_HOLD = "on-hold",
}

interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  tasks: string[];
}

interface DetailedProject {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  tasks: Task[];
  createdBy: User;
  assignedTo: Team | undefined;
}

enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}
interface Task {
  _id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: User | undefined;
}

type Error =
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamModalProps extends ModalProps {
  team: Team;
}

interface TaskModalProps extends ModalProps {
  task: Task;
}

interface ProjectModalProps extends ModalProps {
  project: Project;
}

interface ActionItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string | React.ReactNode;
  onClick: () => void;
}

interface StatCardProps {
  stat: number;
  description: string;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
}

interface SidebarItemProps {
  icon: ReactElement;
  title: string;
  navigateTo: string;
}

interface TitledSegmentProps {
  title: string;
  children: ReactNode;
  showLoading?: boolean;
}
