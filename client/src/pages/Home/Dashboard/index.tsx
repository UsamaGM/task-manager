import {
  CubeIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import StatCard from "./StatCard";
import ActionItem from "./ActionItem";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";
import { useTask } from "@/contexts/TaskContext";
import {
  getFormattedDate,
  getFormattedDateNDaysLater,
} from "@/helpers/date-formatter";
import TitledSegment from "./TitledSegment";
import { TaskStatus } from "type";
import useAuthStore from "@/stores/auth.store";
import useTeamStore from "@/stores/team.store";

function Dashboard() {
  const user = useAuthStore((s) => s.user);

  const teams = useTeamStore((s) => s.teams);
  const teamsLoading = useTeamStore((s) => s.loading);

  const { projects } = useProject();
  const { tasks, getDoneTasksCount } = useTask();
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
    animate(".teams-container > .action-item", animation);
  }, []);

  const thisWeekTasks = tasks.filter(
    (task) => getFormattedDate(task.dueDate) < getFormattedDateNDaysLater(7),
  );
  const todoTasks = tasks.filter((task) => task.status === TaskStatus.TODO);
  const assignedTasksCount = tasks.reduce(
    (acc, task) =>
      task.assignedTo && task.assignedTo._id === user?._id ? acc + 1 : acc,
    0,
  );
  const doneTasksCount = tasks.reduce(
    (acc, task) =>
      task.assignedTo &&
      task.assignedTo._id === user?._id &&
      task.status === TaskStatus.DONE
        ? acc + 1
        : acc,
    0,
  );

  return (
    <div className="flex flex-col space-y-6 w-full h-[calc(100vh-1rem)] overflow-y-scroll p-6">
      <TitledSegment title="Stats">
        <div className="flex w-full space-x-3">
          <StatCard stat={teams.length} description="Teams" />
          <StatCard stat={projects.length} description="Projects" />
          <StatCard stat={tasks.length} description="Total Tasks" />
          <StatCard stat={assignedTasksCount} description="Assigned Tasks" />
          <StatCard stat={doneTasksCount} description="Finished Tasks" />
        </div>
      </TitledSegment>
      <TitledSegment title="Quick Actions">
        <div className="actions-container flex w-full space-x-3">
          <ActionItem
            icon={<UserGroupIcon />}
            title="Create Team"
            subtitle="Create team and invite members"
            onClick={() => navigate("/home/my-teams")}
          />
          <ActionItem
            icon={<CubeIcon />}
            title="Create Project"
            subtitle="Create a new project"
            onClick={() => navigate("/home/my-projects")}
          />
          <ActionItem
            icon={<DocumentTextIcon />}
            title="Create Task"
            subtitle="Create a new task in a project"
            onClick={() => navigate("/home/my-tasks")}
          />
        </div>
      </TitledSegment>
      <TitledSegment title="Tasks">
        <div className="flex w-full space-x-3">
          <TaskList
            title={`This week (${thisWeekTasks.length})`}
            tasks={thisWeekTasks}
          />
          <TaskList title={`To Do (${todoTasks.length})`} tasks={todoTasks} />
        </div>
      </TitledSegment>
      <TitledSegment title="Projects">
        <div className="projects-container flex w-full space-x-3 overflow-x-auto pb-2">
          {projects.map((project, index) => {
            const totalTasks = project.tasks.length;
            const done = getDoneTasksCount(project.tasks);

            return (
              <ActionItem
                key={index}
                icon={<CubeIcon />}
                title={project.name}
                subtitle={
                  <div className="flex flex-col items-start">
                    <p className="line-clamp-2 text-justify">
                      {project.description}
                    </p>
                    <p className="text-sm text-gray-500">{`${done} of ${totalTasks} tasks done`}</p>
                  </div>
                }
                onClick={() => navigate(`/project/${project._id}`)}
              />
            );
          })}
        </div>
      </TitledSegment>

      <TitledSegment title="Teams" showLoading={teamsLoading}>
        <div className="teams-container flex w-full space-x-3 overflow-x-auto pb-2">
          {teams.map((team) => (
            <ActionItem
              key={team._id}
              icon={<UserGroupIcon />}
              title={team.name}
              subtitle={
                <div className="flex flex-col items-start">
                  <p className="line-clamp-2 text-justify">
                    {team.description}
                  </p>
                </div>
              }
              onClick={() => navigate(`/team/${team._id}`)}
            />
          ))}
        </div>
      </TitledSegment>
    </div>
  );
}

export default Dashboard;
