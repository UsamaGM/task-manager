import { Loader } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import { useTeam } from "@/contexts/TeamContext";
import { TeamType, UserType } from "@/helpers/types";
import { UserMinusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { animate } from "animejs";
import { useState } from "react";

interface PropTypes {
  isOpen: boolean;
  team: TeamType;
  onClose: () => void;
}

function RemoveMemberModal({ isOpen, team, onClose }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<UserType[]>([]);

  const { removeMember } = useTeam();

  function handleSelectMember(member: UserType) {
    animate(`#unselected-${member._id}`, {
      translateX: "100%",
      duration: 400,
    }).then(() => {
      setSelectedMembers((prev) => [member, ...prev]);
    });
  }

  function handleUndoSelectMember(member: UserType) {
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
      selectedMembers.map((member) => member._id)
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
    (m) => !selectedMembers.some((s) => s._id === m._id)
  );

  return (
    <ModalContainer title={`Remove member(s) from ${team.name}`}>
      <div className="flex flex-col space-y-3 h-1/2 overflow-x-hidden overflow-y-scroll">
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
              className="hover:bg-red-200 hover:text-red-600 hover:shadow p-1 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-3 h-1/2 overflow-x-hidden overflow-y-scroll">
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
              className="hover:bg-red-200 hover:text-red-600 hover:shadow p-1 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              <XMarkIcon className="size-5 stroke-2" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={handleRemove}
          disabled={isLoading || selectedMembers.length === 0}
          className="flex flex-1 items-center justify-center px-4 py-2 bg-blue-200 text-blue-900 rounded-md hover:bg-blue-300 font-bold transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <UserMinusIcon className="size-5 strole-3 mr-2" />
              Remove Members ({selectedMembers.length})
            </>
          )}
        </button>
      </div>
    </ModalContainer>
  );
}

export default RemoveMemberModal;
