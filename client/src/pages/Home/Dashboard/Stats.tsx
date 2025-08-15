import useAuthStore from "@/stores/auth.store";
import useProjectStore from "@/stores/project.store";
import useTaskStore from "@/stores/task.store";
import useTeamStore from "@/stores/team.store";
import StatCard from "./StatCard";
import TitledSegment from "./TitledSegment";

export default function Stats() {
  const userId = useAuthStore((s) => s.user?._id);

  const projectsCount = useProjectStore((s) => s.projects.length);
  const tasks = useTaskStore((s) => s.tasks);
  const teamsCount = useTeamStore((s) => s.teams.length);

  const assignedTasksCount = tasks.reduce(
    (acc, task) =>
      task.assignedTo && task.assignedTo._id === userId ? acc + 1 : acc,
    0,
  );
  const doneTasksCount = tasks.reduce(
    (acc, task) =>
      task.assignedTo &&
      task.assignedTo._id === userId &&
      task.status === "done"
        ? acc + 1
        : acc,
    0,
  );

  return (
    <TitledSegment title="Stats">
      <div className="flex w-full space-x-3">
        <StatCard stat={teamsCount} description="Teams" />
        <StatCard stat={projectsCount} description="Projects" />
        <StatCard stat={tasks.length} description="Total Tasks" />
        <StatCard stat={assignedTasksCount} description="Assigned Tasks" />
        <StatCard stat={doneTasksCount} description="Finished Tasks" />
      </div>
    </TitledSegment>
  );
}
