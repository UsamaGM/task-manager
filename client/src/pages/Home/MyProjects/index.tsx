import { useProject } from "@/contexts/ProjectContext";
import { ProjectStatusType, ProjectType } from "@/helpers/types";
import TaskListContainer from "@/components/ListContainer";
import ProjectListItem from "./ProjectListItem";
import Headline from "@/components/Headline";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import AssignTeamModal from "./AssignTeamModal";

function MyProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showAssignProjectModal, setShowAssignProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
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

  function onEdit(project: ProjectType) {
    setSelectedProject(project);
    setShowEditProjectModal(true);
  }

  function onAssignTeam(project: ProjectType) {
    setSelectedProject(project);
    setShowAssignProjectModal(true);
  }

  function onDelete(project: ProjectType) {
    setSelectedProject(project);
    setShowDeleteProjectModal(true);
  }

  return (
    <div className="relative flex flex-col space-y-6 h-[calc(100vh-1rem)] p-6">
      <Headline
        title="My Projects"
        rightButtonTitle="New Project"
        rightButtonAction={() => setShowCreateProjectModal(true)}
      />
      <div className="flex flex-1 h-full space-x-6">
        <TaskListContainer title={`Active (${activeProjects.length})`}>
          {activeProjects.map((project) => (
            <ProjectListItem
              key={project._id}
              project={project}
              onEdit={onEdit}
              onAssignTeam={onAssignTeam}
              onDelete={onDelete}
            />
          ))}
        </TaskListContainer>
        <TaskListContainer title={`On Hold (${onHoldProjects.length})`}>
          {onHoldProjects.map((project) => (
            <ProjectListItem
              key={project._id}
              project={project}
              onEdit={onEdit}
              onAssignTeam={onAssignTeam}
              onDelete={onDelete}
            />
          ))}
        </TaskListContainer>
        <TaskListContainer title={`Completed (${completedProjects.length})`}>
          {completedProjects.map((project) => (
            <ProjectListItem
              key={project._id}
              project={project}
              onEdit={onEdit}
              onAssignTeam={onAssignTeam}
              onDelete={onDelete}
            />
          ))}
        </TaskListContainer>
      </div>
      <CreateProjectModal
        isOpen={showCreateProjectModal}
        onClose={() => setShowCreateProjectModal(false)}
      />
      <EditProjectModal
        isOpen={showEditProjectModal}
        project={selectedProject!}
        onClose={() => setShowEditProjectModal(false)}
      />
      <AssignTeamModal
        isOpen={showAssignProjectModal}
        project={selectedProject!}
        onClose={() => setShowAssignProjectModal(false)}
      />
      <DeleteProjectModal
        isOpen={showDeleteProjectModal}
        project={selectedProject!}
        onClose={() => setShowDeleteProjectModal(false)}
      />
    </div>
  );
}

export default MyProjects;
