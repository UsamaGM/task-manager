import { Project } from "type";
import { useModals } from "./useModals";
import CreateProjectModal from "@/pages/Home/MyProjects/CreateProjectModal";
import EditProjectModal from "@/pages/Home/MyProjects/EditProjectModal";
import DeleteProjectModal from "@/pages/Home/MyProjects/DeleteProjectModal";
import AssignTeamModal from "@/pages/Home/MyProjects/AssignTeamModal";

interface ProjectModalData {
  create: null;
  edit: Project | null;
  delete: Project | null;
  assignTeam: Project | null;
}

export function useProjectModals() {
  const { modals, openModal, closeModal, closeAllModals, isAnyModalOpen } =
    useModals<ProjectModalData>({
      create: null,
      edit: null,
      delete: null,
      assignTeam: null,
    });

  const handlers = {
    createProject: () => openModal("create"),
    editProject: (project: Project) => openModal("edit", project),
    deleteProject: (project: Project) => openModal("delete", project),
    assignTeamToProject: (project: Project) => openModal("assignTeam", project),
  };

  const closeHandlers = {
    closeCreate: () => closeModal("create"),
    closeEdit: () => closeModal("edit"),
    closeDelete: () => closeModal("delete"),
    closeAssignTeam: () => closeModal("assignTeam"),
  };

  const ModalComponents = () => (
    <>
      <CreateProjectModal
        isOpen={modals.create.isOpen}
        onClose={closeHandlers.closeCreate}
      />
      {modals.edit.data && (
        <EditProjectModal
          isOpen={modals.edit.isOpen}
          project={modals.edit.data}
          onClose={closeHandlers.closeEdit}
        />
      )}
      {modals.delete.data && (
        <DeleteProjectModal
          isOpen={modals.delete.isOpen}
          project={modals.delete.data}
          onClose={closeHandlers.closeDelete}
        />
      )}
      {modals.assignTeam.data && (
        <AssignTeamModal
          isOpen={modals.assignTeam.isOpen}
          project={modals.assignTeam.data}
          onClose={closeHandlers.closeAssignTeam}
        />
      )}
    </>
  );

  return {
    modals,
    isAnyModalOpen,

    ...handlers,

    ...closeHandlers,
    closeAllModals,

    ModalComponents,
  };
}
