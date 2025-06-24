import { Loader } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import { useTeam } from "@/contexts/TeamContext";
import { TeamModalPropTypes } from "@/helpers/types";
import { useState } from "react";
import { toast } from "react-toastify";

function DeleteTeamModal({ isOpen, team, onClose }: TeamModalPropTypes) {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteTeam } = useTeam();

  async function handleDeleteTeam() {
    setIsLoading(true);
    const isTeamDeleted = await deleteTeam(team._id);
    if (isTeamDeleted) toast.success(`Team ${team.name} deleted`);
    setIsLoading(false);
    onClose();
  }

  if (!isOpen) return null;
  return (
    <ModalContainer title={`Delete Team ${team.name}`}>
      <h3>
        Are you sure you want to delete team "{team.name}"? This action is
        permanent and all data associated with this team will be erased.
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

export default DeleteTeamModal;
