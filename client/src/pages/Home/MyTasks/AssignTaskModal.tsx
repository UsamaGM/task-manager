import CancelButton from "@/components/CancelButton";
import ModalContainer from "@/components/ModalContainer";
import NoXMessage from "@/components/NoXMessage";
import useProjectStore from "@/stores/project.store";
import useTaskStore from "@/stores/task.store";
import useTeamStore from "@/stores/team.store";
import { Task, TaskModalProps } from "type";

function AssignTaskModal({ isOpen, task, onClose }: TaskModalProps) {
  if (!isOpen) return null;
  return (
    <ModalContainer
      title={`Assign "${task.name}" to a Member`}
      onClose={onClose}
    >
      <TeamMemberList task={task} onClose={onClose} />
      <CancelButton onClick={onClose} />
    </ModalContainer>
  );
}

export default AssignTaskModal;

interface TeamMemberListPropTypes {
  task: Task;
  onClose: () => void;
}

function TeamMemberList({ task, onClose }: TeamMemberListPropTypes) {
  const project = useProjectStore((s) => s.getProjectWithTask(task._id));
  const team = useTeamStore((s) => s.findTeamWithProject(project._id));
  const assignTask = useTaskStore((s) => s.assignTask);
  const loading = useTaskStore((s) => s.loading);

  async function handleAssignment(memberId: string) {
    await assignTask(task._id, memberId);
    onClose();
  }

  const filteredMembers = team?.members.filter(
    (m) => m._id !== task.assignedTo?._id,
  );

  return (
    <div className="h-full overflow-auto">
      {filteredMembers && filteredMembers.length ? (
        filteredMembers.map((member) => (
          <div className="flex justify-between items-center w-full px-3 py-2 text-left border-b border-gray-100 last:border-b-0">
            <span className="text-sm font-bold text-gray-700">
              {member.username}
            </span>

            <button
              key={member._id}
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
