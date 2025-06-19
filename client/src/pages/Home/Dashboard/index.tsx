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
import { stagger, Timeline } from "animejs";
import { ProjectType, TaskType } from "@/config/type";
import { useNavigate } from "react-router-dom";

const thisWeekTasks: Array<TaskType> = [
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
    const tl = new Timeline({
      duration: 300,
    });

    tl.add(
      ".action-item",
      {
        translateY: [0, "-1.5rem"],
        opacity: [0, 1],
      },
      stagger(150)
    );
  });

  return (
    <div className="flex flex-col space-y-6 w-full p-6">
      <div className="flex w-full space-x-3">
        <StatCard index={0} stat={10} description="Projects" />
        <StatCard index={1} stat={139} description="Total Tasks" />
        <StatCard index={2} stat={10} description="Assigned Tasks" />
        <StatCard index={3} stat={52} description="Finished Tasks" />
      </div>
      <div className="flex w-full space-x-3">
        <ActionItem
          index={0}
          icon={<CubeIcon />}
          title="Create Project"
          subtitle="Create a new project with AI"
          onClick={() => navigate("/home/new-project")}
        />
        <ActionItem
          index={1}
          icon={<ClipboardIcon />}
          title="Create Task"
          subtitle="Create a new task for a project"
          onClick={() => navigate("/home/new-task")}
        />
        <ActionItem
          index={2}
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
      <div className="flex w-full space-x-3 overflow-x-scroll pb-2">
        {projects.map((project, index) => {
          const totalTasks = project.tasks.length;
          const done = project.tasks.filter(
            (task) => task.status === "done"
          ).length;

          return (
            <ActionItem
              key={index}
              index={index + 3}
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
