import { useProject } from "@/contexts/ProjectContext";
import { ProjectStatusType } from "@/helpers/types";
import TaskListContainer from "@/components/ListContainer";
import ProjectListItem from "./ProjectListItem";
import Headline from "@/components/Headline";

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
    <div className="flex flex-col space-y-6 h-[calc(100vh-5rem)] p-6">
      <Headline
        title="My Projects"
        rightLinkTitle="New Project"
        rightLinkTo="/home/new-project"
      />
      <div className="flex flex-1 h-full space-x-6">
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
