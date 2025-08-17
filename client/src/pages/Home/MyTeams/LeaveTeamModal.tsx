import ModalContainer from "@/components/ModalContainer";
import useTeamStore from "@/stores/team.store";
import { TeamModalProps } from "type";

function LeaveTeamModal({ isOpen, team, onClose }: TeamModalProps) {
  const leaveTeam = useTeamStore((s) => s.leaveTeam);

  function handleLeaveTeam() {
    leaveTeam(team._id);

    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Leave team ${team.name}`} onClose={onClose}>
      <h3>
        Are you sure you want to leave team "{team.name}"? You cannot rejoin
        without admin approval.
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
          onClick={handleLeaveTeam}
          className="w-full bg-red-500 hover:bg-red-700 text-white transition-colors duration-300 rounded-lg cursor-pointer"
        >
          Leave
        </button>
      </div>
    </ModalContainer>
  );
}

export default LeaveTeamModal;
