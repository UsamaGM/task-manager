import { useNavigate } from "react-router-dom";
import ActionItem from "./ActionItem";
import { CubeIcon } from "@heroicons/react/24/outline";
import { ProjectActionItemProps } from "type";
import useTaskStore from "@/stores/task.store";

export default function ProjectActionItem({
  project,
  index,
}: ProjectActionItemProps) {
  const getDoneTasksCount = useTaskStore((s) => s.getDoneTasksCount);

  const navigate = useNavigate();

  const done = getDoneTasksCount(project.tasks);
  const totalTasks = project.tasks.length;

  return (
    <ActionItem
      key={index}
      icon={<CubeIcon />}
      title={project.name}
      subtitle={
        <div className="flex flex-col items-start">
          <p className="line-clamp-2 text-justify">{project.description}</p>
          <p className="text-sm text-gray-500">{`${done} of ${totalTasks} tasks done`}</p>
        </div>
      }
      onClick={() => navigate(`/project/${project._id}`)}
    />
  );
}
