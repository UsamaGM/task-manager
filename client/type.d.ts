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

type ProjectStatus = "active" | "completed" | "on-hold";

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

type TaskPriority = "low" | "medium" | "high";
type TaskStatus = "todo" | "in-progress" | "done";

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

interface ProjectActionItemProps {
  project: Project;
  index: number;
}

type TeamFn = (team: Team) => void;
interface TeamListItemProps {
  team: Team;
  handleAddMember: TeamFn;
  handleRemoveMember: TeamFn;
  handleEditTeam: TeamFn;
  handleDeleteTeam: TeamFn;
  handleLeaveTeam: TeamFn;
}
interface TeamsProps {
  fns: {
    addMemberToTeam: TeamFn;
    removeMemberFromTeam: TeamFn;
    editTeam: TeamFn;
    deleteTeam: TeamFn;
    leaveTeam: TeamFn;
  };
}

type ProjectFn = (project: Project) => void;
interface ProjectsProps {
  fns: {
    editProject: ProjectFn;
    assignTeamToProject: ProjectFn;
    deleteProject: ProjectFn;
  };
}

type TaskFn = (task: Task) => void;
interface TasksProps {
  fns: {
    editTask: TaskFn;
    assignTask: TaskFn;
    deleteTask: TaskFn;
  };
}

interface SubmitButtonProps {
  isLoading: boolean;
  onClick?: (e?: any) => void;
  title: string;
  className?: string;
}

interface ModalContainerProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}
