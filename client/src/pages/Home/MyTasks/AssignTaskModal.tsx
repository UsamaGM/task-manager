import CancelButton from "@/components/CancelButton";
import ModalContainer from "@/components/ModalContainer";
import NoXMessage from "@/components/NoXMessage";
import { useProject } from "@/contexts/ProjectContext";
import { useTask } from "@/contexts/TaskContext";
import { useTeam } from "@/contexts/TeamContext";
import { ModalPropTypes, TaskType } from "@/helpers/types";
import { toast } from "react-toastify";

interface PropTypes extends ModalPropTypes {
  task: TaskType;
}

function AssignTaskModal({ isOpen, task, onClose }: PropTypes) {
  if (!isOpen) return null;
  return (
    <ModalContainer title={`Assign "${task.name}" to a Member`}>
      <TeamMemberList task={task} onClose={onClose} />
      <CancelButton onClick={onClose} />
    </ModalContainer>
  );
}

export default AssignTaskModal;

interface TeamMemberListPropTypes {
  task: TaskType;
  onClose: () => void;
}

function TeamMemberList({ task, onClose }: TeamMemberListPropTypes) {
  const project = useProject().getProjectWithTask(task._id);
  if (!project) {
    toast.warn(
      "You need to assign the Project to a team and the team admin will handle tasks."
    );
    onClose();
  }
  const team = useTeam().findTeamWithProject(project._id);
  const { assignTask } = useTask();

  async function handleAssignment(memberId: string) {
    await assignTask(task._id, memberId);
    onClose();
  }

  return (
    <div className="h-full overflow-auto">
      {team?.members.length ? (
        team.members.map((member) => (
          <div className="flex justify-between items-center w-full px-3 py-2 text-left border-b border-gray-100 last:border-b-0">
            <span className="text-sm font-bold text-gray-700">
              {member.username}
            </span>

            <button
              key={team._id}
              onClick={() => handleAssignment(member._id)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-sm rounded-lg p-2 transition-colors duration-300 cursor-pointer"
            >
              Assign
            </button>
          </div>
        ))
      ) : (
        <NoXMessage message="No Members in the team. Add some members to assign tasks." />
      )}
    </div>
  );
}
