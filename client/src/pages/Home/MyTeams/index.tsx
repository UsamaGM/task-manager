import { useEffect, useState } from "react";
import { Headline } from "@/components";
import TeamListItem from "./TeamListItem";
import CreateTeamModal from "./CreateTeamModal";
import { animate, stagger } from "animejs";
import AddMemberModal from "./AddMemberModal";
import RemoveMemberModal from "./RemoveMemberModal";
import EditTeamModal from "./EditTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";
import LeaveTeamModal from "./LeaveTeamModal";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import NoXMessage from "@/components/NoXMessage";
import { Team } from "type";
import useTeamStore from "@/stores/team.store";

function MyTeams() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);
  const [showLeaveTeamModal, setShowLeaveTeamModal] = useState(false);

  const teams = useTeamStore((s) => s.teams);

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
    <div className="relative flex flex-col space-y-6 h-[calc(100vh-1rem)] p-6">
      <Headline
        title="My Teams"
        rightButtonTitle="Create Team"
        rightButtonAction={() => setShowCreateTeamModal(true)}
      />
      {teams.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full overflow-y-scroll">
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
      ) : (
        <NoXMessage
          icon={<UserGroupIcon />}
          message="No Teams yet. Create or join one to start working."
        />
      )}
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
