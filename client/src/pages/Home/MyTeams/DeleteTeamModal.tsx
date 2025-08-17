import { CancelButton, SubmitButton } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import useTeamStore from "@/stores/team.store";
import { TeamModalProps } from "type";

function DeleteTeamModal({ isOpen, team, onClose }: TeamModalProps) {
  const deleteTeam = useTeamStore((s) => s.deleteTeam);

  function handleDeleteTeam() {
    deleteTeam(team._id);
    onClose();
  }

  if (!isOpen) return null;
  return (
    <ModalContainer title={`Delete Team ${team.name}`} onClose={onClose}>
      <div className="flex flex-col space-y-10 mt-4">
        <h3>
          Are you sure you want to delete team "{team.name}"? This action is
          permanent and all data associated with this team will be erased.
        </h3>

        <div className="flex space-x-5">
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={false}
            title="Delete Team"
            onClick={handleDeleteTeam}
            className="border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white"
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteTeamModal;
