import ModalContainer from "@/components/ModalContainer";
import { useTeam } from "@/contexts/TeamContext";
import { toast } from "react-toastify";
import { TeamModalProps } from "type";

function LeaveTeamModal({ isOpen, team, onClose }: TeamModalProps) {
  const { leaveTeam } = useTeam();

  async function handleLeaveTeam() {
    const hasLeftTeam = await leaveTeam(team._id);
    if (hasLeftTeam) toast.success(`You left team ${team.name}`);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Leave team ${team.name}`}>
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
