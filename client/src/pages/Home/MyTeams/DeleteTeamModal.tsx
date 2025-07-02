import { CancelButton, SubmitButton } from "@/components";
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
      <div className="flex flex-col space-y-10 mt-4">
        <h3>
          Are you sure you want to delete team "{team.name}"? This action is
          permanent and all data associated with this team will be erased.
        </h3>

        <div className="flex space-x-5">
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={isLoading}
            title="Delete Team"
            onClick={handleDeleteTeam}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteTeamModal;
