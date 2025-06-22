import { useProject } from "@/contexts/ProjectContext";
import { ProjectStatusType } from "@/helpers/types";
import TaskListContainer from "@/components/ListContainer";
import { PlusIcon } from "@heroicons/react/24/solid";
import ProjectListItem from "./ProjectListItem";
import { Link } from "react-router-dom";

function MyProjects() {
  const { projects } = useProject();

  const activeProjects = projects.filter(
    (project) => project.status === ProjectStatusType.ACTIVE
  );
  const onHoldProjects = projects.filter(
    (project) => project.status === ProjectStatusType.ON_HOLD
  );
  const completedProjects = projects.filter(
    (project) => project.status === ProjectStatusType.COMPLETED
  );

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">My Projects</h3>
        <Link
          to="/home/new-project"
          className="flex space-x-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow p-3 transition-colors duration-300"
        >
          <PlusIcon className="size-5" />
          <span className="text-sm font-bold">Create Project</span>
        </Link>
      </div>
      <div className="flex space-x-6">
        <TaskListContainer title={`Active (${activeProjects.length})`}>
          {activeProjects.map((project) => (
            <ProjectListItem key={project._id} project={project} />
          ))}
        </TaskListContainer>
        <TaskListContainer title={`On Hold (${onHoldProjects.length})`}>
          {onHoldProjects.map((project) => (
            <ProjectListItem key={project._id} project={project} />
          ))}
        </TaskListContainer>
        <TaskListContainer title={`Completed (${completedProjects.length})`}>
          {completedProjects.map((project) => (
            <ProjectListItem key={project._id} project={project} />
          ))}
        </TaskListContainer>
      </div>
    </div>
  );
}

export default MyProjects;
