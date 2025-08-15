import useTeamStore from "@/stores/team.store";
import TeamListItem from "./TeamListItem";
import { NoXMessage } from "@/components";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { TeamsProps } from "type";

export default function Teams({
  fns: {
    addMemberToTeam,
    removeMemberFromTeam,
    editTeam,
    deleteTeam,
    leaveTeam,
  },
}: TeamsProps) {
  const teams = useTeamStore((s) => s.teams);

  return teams.length ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full overflow-y-auto">
      {teams.map((team) => (
        <TeamListItem
          key={team._id}
          handleAddMember={addMemberToTeam}
          handleRemoveMember={removeMemberFromTeam}
          handleEditTeam={editTeam}
          handleDeleteTeam={deleteTeam}
          handleLeaveTeam={leaveTeam}
          team={team}
        />
      ))}
    </div>
  ) : (
    <NoXMessage
      icon={<UserGroupIcon />}
      message="No Teams yet. Create or join one to start working."
    />
  );
}
