import { useProject } from "@/contexts/ProjectContext";
import { ProjectStatusType, ProjectType } from "@/helpers/types";
import TaskListContainer from "@/components/ListContainer";
import ProjectListItem from "./ProjectListItem";
import Headline from "@/components/Headline";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

function MyProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
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
              onEdit={() => {
                setSelectedProject(project);
                setShowEditProjectModal(true);
              }}
              onDelete={() => {
                setSelectedProject(project);
                setShowDeleteProjectModal(true);
              }}
            />
          ))}
        </TaskListContainer>
        <TaskListContainer title={`On Hold (${onHoldProjects.length})`}>
          {onHoldProjects.map((project) => (
            <ProjectListItem
              key={project._id}
              project={project}
              onEdit={() => {
                setSelectedProject(project);
                setShowEditProjectModal(true);
              }}
              onDelete={() => {
                setSelectedProject(project);
                setShowDeleteProjectModal(true);
              }}
            />
          ))}
        </TaskListContainer>
        <TaskListContainer title={`Completed (${completedProjects.length})`}>
          {completedProjects.map((project) => (
            <ProjectListItem
              key={project._id}
              project={project}
              onEdit={() => {
                setSelectedProject(project);
                setShowEditProjectModal(true);
              }}
              onDelete={() => {
                setSelectedProject(project);
                setShowDeleteProjectModal(true);
              }}
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
      <DeleteProjectModal
        isOpen={showDeleteProjectModal}
        project={selectedProject!}
        onClose={() => setShowDeleteProjectModal(false)}
      />
    </div>
  );
}

export default MyProjects;
