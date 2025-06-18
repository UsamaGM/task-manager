import {
  ClipboardIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import StatCard from "./StatCard";
import ActionItem from "./ActionItem";
import TaskList from "./TaskList";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex w-full space-x-6">
        <StatCard index={0} stat={139} description="Total Tasks" />
        <StatCard index={1} stat={10} description="Assigned Tasks" />
        <StatCard index={2} stat={52} description="Finished Tasks" />
      </div>
      <div className="flex w-full space-x-6">
        <ActionItem
          index={0}
          onClick={() => console.log("Create Project")}
          icon={<CubeIcon />}
          title="Create Project"
          subtitle="Create a new project with AI"
        />
        <ActionItem
          index={1}
          onClick={() => console.log("Create Task")}
          icon={<ClipboardIcon />}
          title="Create Task"
          subtitle="Create a new task for a project"
        />
        <ActionItem
          index={2}
          onClick={() => console.log("Invite Team")}
          icon={<UsersIcon />}
          title="Invite Team"
          subtitle="Invite team members for tasks"
        />
      </div>
      <div className="flex w-full space-x-6">
        <TaskList
          title="To do this week"
          tasks={[
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
          ]}
        />
        <TaskList
          title="To review"
          tasks={[
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
          ]}
        />
      </div>
    </div>
  );
}

export default Dashboard;
