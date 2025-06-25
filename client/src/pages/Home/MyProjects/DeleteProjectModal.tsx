import { Loader } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import { useProject } from "@/contexts/ProjectContext";
import { ModalPropTypes, ProjectType } from "@/helpers/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface PropTypes extends ModalPropTypes {
  project: ProjectType;
}

function DeleteProjectModal({ isOpen, project, onClose }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteProject } = useProject();

  async function handleDeleteTeam() {
    setIsLoading(true);
    const wasProjectDeleted = await deleteProject(project._id);
    if (wasProjectDeleted) toast.success(`Project "${project.name}" deleted`);
    setIsLoading(false);
    onClose();
  }

  if (!isOpen) return null;
  return (
    <ModalContainer title={`Delete Project "${project.name}"`}>
      <h3>
        Are you sure you want to delete the project "{project.name}"? This
        action is permanent and all data associated with this team will be
        erased.
      </h3>

      <div className="flex space-x-5">
        <button
          type="button"
          onClick={onClose}
          className="w-full p-2 hover:bg-red-200 hover:text-red-700 transition-colors duration-300 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDeleteTeam}
          className="w-full p-2 bg-red-500 hover:bg-red-700 text-white transition-colors duration-300 rounded-lg cursor-pointer"
        >
          {isLoading ? <Loader size="small" /> : "Delete"}
        </button>
      </div>
    </ModalContainer>
  );
}

export default DeleteProjectModal;
