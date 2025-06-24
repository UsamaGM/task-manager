import { useEffect, useState } from "react";
import { useTeam } from "@/contexts/TeamContext";
import { Headline } from "@/components";
import TeamListItem from "./TeamListItem";
import CreateTeamModal from "./CreateTeamModal";
import { animate, stagger } from "animejs";
import AddMemberModal from "./AddMemberModal";
import { TeamType } from "@/helpers/types";
import RemoveMemberModal from "./RemoveMemberModal";
import EditTeamModal from "./EditTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";
import LeaveTeamModal from "./LeaveTeamModal";

function MyTeams() {
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);
  const [showLeaveTeamModal, setShowLeaveTeamModal] = useState(false);

  const { teams } = useTeam();

  useEffect(() => {
    animate(".team-list-item", {
      scale: 1.1,
      translateY: "8rem",
      opacity: 1,
      duration: 400,
      delay: stagger(100),
    });
  }, [teams]);

  return (
    <div className="relative flex flex-col space-y-6 h-screen p-6">
      <Headline
        title="My Teams"
        rightButtonTitle="Create Team"
        rightButtonAction={() => setShowCreateTeamModal(true)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-scroll">
        {teams.map((team) => (
          <TeamListItem
            key={team._id}
            handleAddMember={() => {
              setShowAddMemberModal(true);
              setSelectedTeam(team);
            }}
            handleRemoveMember={() => {
              setShowRemoveMemberModal(true);
              setSelectedTeam(team);
            }}
            handleEditTeam={() => {
              setShowEditTeamModal(true);
              setSelectedTeam(team);
            }}
            handleDeleteTeam={() => {
              setShowDeleteTeamModal(true);
              setSelectedTeam(team);
            }}
            handleLeaveTeam={() => {
              setShowLeaveTeamModal(true);
              setSelectedTeam(team);
            }}
            team={team}
          />
        ))}
      </div>
      <CreateTeamModal
        isOpen={showCreateTeamModal}
        onClose={() => setShowCreateTeamModal(false)}
      />
      <AddMemberModal
        isOpen={showAddMemberModal}
        team={selectedTeam!}
        onClose={() => setShowAddMemberModal(false)}
      />
      <RemoveMemberModal
        isOpen={showRemoveMemberModal}
        team={selectedTeam!}
        onClose={() => setShowRemoveMemberModal(false)}
      />
      <EditTeamModal
        isOpen={showEditTeamModal}
        team={selectedTeam!}
        onClose={() => setShowEditTeamModal(false)}
      />
      <DeleteTeamModal
        isOpen={showDeleteTeamModal}
        team={selectedTeam!}
        onClose={() => setShowDeleteTeamModal(false)}
      />
      <LeaveTeamModal
        isOpen={showLeaveTeamModal}
        team={selectedTeam!}
        onClose={() => setShowLeaveTeamModal(false)}
      />
    </div>
  );
}

export default MyTeams;
