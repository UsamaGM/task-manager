import { CancelButton, SubmitButton } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import useProjectStore from "@/stores/project.store";
import { toast } from "react-toastify";
import { ProjectModalProps } from "type";

function DeleteProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  const loading = useProjectStore((s) => s.loading);
  const deleteProject = useProjectStore((s) => s.deleteProject);

  async function handleDeleteTeam() {
    const wasProjectDeleted = await deleteProject(project._id);

    if (wasProjectDeleted) toast.success(`Project "${project.name}" deleted`);
    onClose();
  }

  if (!isOpen) return null;
  return (
    <ModalContainer title={`Delete Project "${project.name}"`}>
      <div className="flex flex-col space-y-10 mt-4">
        <h3>
          Are you sure you want to delete the project "{project.name}"? This
          action is permanent and all data associated with this team will be
          erased.
        </h3>

        <div className="flex space-x-5">
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={loading}
            title="Delete Project"
            onClick={handleDeleteTeam}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteProjectModal;
