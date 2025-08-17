import { CancelButton, SubmitButton } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import useProjectStore from "@/stores/project.store";
import { ProjectModalProps } from "type";

function DeleteProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  const deleteProject = useProjectStore((s) => s.deleteProject);

  function handleDeleteTeam() {
    deleteProject(project._id);

    onClose();
  }

  if (!isOpen) return null;
  return (
    <ModalContainer
      title={`Delete Project "${project.name}"`}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-10 mt-4">
        <h3>
          Are you sure you want to delete the project "{project.name}"? This
          action is permanent and all data associated with this team will be
          erased.
        </h3>

        <div className="flex space-x-5">
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={false}
            title="Delete Project"
            onClick={handleDeleteTeam}
            className="border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white"
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteProjectModal;
