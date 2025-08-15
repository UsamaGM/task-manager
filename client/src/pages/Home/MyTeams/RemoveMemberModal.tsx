import { CancelButton, SubmitButton } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import useTeamStore from "@/stores/team.store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { animate } from "animejs";
import { useState } from "react";
import { TeamModalProps, User } from "type";

function RemoveMemberModal({ isOpen, team, onClose }: TeamModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

  const removeMember = useTeamStore((s) => s.removeMember);

  function handleSelectMember(member: User) {
    animate(`#unselected-${member._id}`, {
      translateX: "100%",
      duration: 400,
    }).then(() => {
      setSelectedMembers((prev) => [member, ...prev]);
    });
  }

  function handleUndoSelectMember(member: User) {
    animate(`#selected-${member._id}`, {
      translateX: "100%",
      duration: 400,
    }).then(() => {
      setSelectedMembers((prev) => prev.filter((m) => m._id !== member._id));
    });
  }

  async function handleRemove() {
    setIsLoading(true);
    await removeMember(
      team._id,
      selectedMembers.map((member) => member._id),
    );
    setIsLoading(false);
    setSelectedMembers([]);
    onClose();
  }

  function handleClose() {
    setIsLoading(false);
    setSelectedMembers([]);
    onClose();
  }

  if (!isOpen) return null;

  const filteredMembers = team.members.filter(
    (m) => !selectedMembers.some((s) => s._id === m._id),
  );

  return (
    <ModalContainer title={`Remove member(s) from ${team.name}`}>
      <div className="flex flex-col h-full overflow-hidden space-y-4">
        <div className="flex flex-col h-1/2 space-y-3 overflow-x-hidden">
          {filteredMembers.map((member) => (
            <div
              id={`unselected-${member._id}`}
              key={member._id}
              className="flex justify-between items-center text-gray-800 font-bold p-2 rounded-lg border border-gray-300 shadow"
            >
              <div className="flex flex-col space-y-0">
                <h3>{member.username}</h3>
                <h4 className="text-sm">{member.email}</h4>
              </div>
              <button
                onClick={() => handleSelectMember(member)}
                className="bg-red-100 hover:bg-red-200 text-red-800 hover:shadow p-1 rounded-lg transition-colors duration-300 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col h-1/2 overflow-x-hidden space-y-3">
          <h2>Selected Members ({selectedMembers.length})</h2>
          {selectedMembers.map((member) => (
            <div
              id={`selected-${member._id}`}
              key={member._id}
              className="flex justify-between items-center text-gray-800 font-bold p-2 rounded-lg border border-gray-300 shadow"
            >
              <div className="flex flex-col space-y-0">
                <h3>{member.username}</h3>
                <h4 className="text-sm">{member.email}</h4>
              </div>
              <button
                onClick={() => handleUndoSelectMember(member)}
                className="bg-red-100 hover:bg-red-200 hover:text-red-600 hover:shadow p-1 rounded-lg transition-colors duration-300 cursor-pointer"
              >
                <XMarkIcon className="size-5 stroke-2" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <CancelButton onClick={handleClose} />
          <SubmitButton
            title="Remove Selected"
            isLoading={isLoading}
            onClick={handleRemove}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default RemoveMemberModal;
