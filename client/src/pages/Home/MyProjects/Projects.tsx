import { NoXMessage } from "@/components";
import useProjectStore from "@/stores/project.store";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import ProjectListItem from "./ProjectListItem";
import ListContainer from "@/components/ListContainer";
import { ProjectsProps } from "type";

export default function Projects({
  fns: { editProject, assignTeamToProject, deleteProject },
}: ProjectsProps) {
  const projects = useProjectStore((s) => s.projects);

  const activeProjects = projects.filter(
    (project) => project.status === "active",
  );
  const onHoldProjects = projects.filter(
    (project) => project.status === "on-hold",
  );
  const completedProjects = projects.filter(
    (project) => project.status === "completed",
  );

  return projects.length ? (
    <div className="flex h-full space-x-6 overflow-hidden">
      <ListContainer title={`Active (${activeProjects.length})`}>
        {activeProjects.map((project) => (
          <ProjectListItem
            key={project._id}
            project={project}
            onEdit={editProject}
            onAssignTeam={assignTeamToProject}
            onDelete={deleteProject}
          />
        ))}
      </ListContainer>
      <ListContainer title={`On Hold (${onHoldProjects.length})`}>
        {onHoldProjects.map((project) => (
          <ProjectListItem
            key={project._id}
            project={project}
            onEdit={editProject}
            onAssignTeam={assignTeamToProject}
            onDelete={deleteProject}
          />
        ))}
      </ListContainer>
      <ListContainer title={`Completed (${completedProjects.length})`}>
        {completedProjects.map((project) => (
          <ProjectListItem
            key={project._id}
            project={project}
            onEdit={editProject}
            onAssignTeam={assignTeamToProject}
            onDelete={deleteProject}
          />
        ))}
      </ListContainer>
    </div>
  ) : (
    <NoXMessage
      icon={<CubeTransparentIcon />}
      message="No Project created. Create a project to start creating tasks."
    />
  );
}
