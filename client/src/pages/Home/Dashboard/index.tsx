import {
  ClipboardIcon,
  CubeIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import StatCard from "./StatCard";
import ActionItem from "./ActionItem";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { animate, stagger } from "animejs";
import {
  ProjectType,
  TaskPriorityType,
  TaskStatusType,
  TaskType,
} from "@/config/type";
import { useNavigate } from "react-router-dom";

const thisWeekTasks: Array<TaskType> = [
  {
    name: "Task 1",
    project: "Project Alpha",
    dueDate: "2023-10-31",
    status: TaskStatusType.DONE,
    priority: TaskPriorityType.HIGH,
  },
  {
    name: "Task 2",
    project: "Project Beta",
    dueDate: "2023-11-02",
    status: "done",
    priority: "low",
  },
  {
    name: "Task 3",
    project: "Project Gamma",
    dueDate: "2023-11-05",
    status: "done",
    priority: "low",
  },
  {
    name: "Task 4",
    project: "Project Delta",
    dueDate: "2023-11-07",
    status: "done",
    priority: "low",
  },
];

const toReviewTasks: Array<TaskType> = [
  {
    name: "Task 1",
    project: "Project Alpha",
    dueDate: "2023-10-31",
    status: "done",
    priority: "low",
  },
  {
    name: "Task 2",
    project: "Project Beta",
    dueDate: "2023-11-02",
    status: "done",
    priority: "medium",
  },
  {
    name: "Task 3",
    project: "Project Gamma",
    dueDate: "2023-11-05",
    status: "todo",
    priority: "high",
  },
  {
    name: "Task 4",
    project: "Project Delta",
    dueDate: "2023-11-07",
    status: "in-progress",
    priority: "high",
  },
];

const projects: Array<ProjectType> = [
  {
    name: "Project Alpha",
    description: "Description for Project Alpha",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    status: "active",
    tasks: [],
  },
  {
    name: "Project Beta",
    description: "Description for Project Beta",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    status: "active",
    tasks: [],
  },
  {
    name: "Project Gamma",
    description: "Description for Project Gamma",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    status: "active",
    tasks: [],
  },
  {
    name: "Project Delta",
    description: "Description for Project Delta very useful project",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    status: "active",
    tasks: [],
  },
];

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const animation = {
      translateY: [0, "-1.5rem"],
      opacity: 1,
      duration: 300,
      delay: stagger(100),
    };
    animate(".actions-container > .action-item", animation);
    animate(".projects-container > .action-item", animation);
  }, []);

  return (
    <div className="flex flex-col space-y-6 w-full p-6">
      <div className="flex w-full space-x-3">
        <StatCard stat={10} description="Projects" />
        <StatCard stat={139} description="Total Tasks" />
        <StatCard stat={10} description="Assigned Tasks" />
        <StatCard stat={52} description="Finished Tasks" />
      </div>
      <div className="actions-container flex w-full space-x-3">
        <ActionItem
          icon={<CubeIcon />}
          title="Create Project"
          subtitle="Create a new project with AI"
          onClick={() => navigate("/home/new-project")}
        />
        <ActionItem
          icon={<ClipboardIcon />}
          title="Create Task"
          subtitle="Create a new task for a project"
          onClick={() => navigate("/home/new-task")}
        />
        <ActionItem
          icon={<UsersIcon />}
          title="Invite Team"
          subtitle="Invite team members for tasks"
          onClick={() => console.log("Invite Team")}
        />
      </div>
      <div className="flex w-full space-x-3">
        <TaskList title="To do this week" tasks={thisWeekTasks} />
        <TaskList title="To review" tasks={toReviewTasks} />
      </div>
      <div className="projects-container flex w-full space-x-3 overflow-x-scroll pb-2">
        {projects.map((project, index) => {
          const totalTasks = project.tasks.length;
          const done = project.tasks.filter(
            (task) => task.status === "done"
          ).length;

          return (
            <ActionItem
              key={index}
              icon={<KeyIcon />}
              title={project.name}
              subtitle={
                <div className="flex flex-col items-start">
                  <p className="line-clamp-2 overflow-ellipsis text-justify">
                    {project.description}
                  </p>
                  <p className="text-sm text-gray-500">{`${done} of ${totalTasks} tasks done`}</p>
                  <p>Ends on {project.endDate}</p>
                </div>
              }
              onClick={() => console.log("Navigate to", project.name)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
