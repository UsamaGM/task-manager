import { useEffect, useState } from "react";
import { useTeam } from "@/contexts/TeamContext";
import { Headline } from "@/components";
import TeamListItem from "./TeamListItem";
import CreateTeamModal from "./CreateTeamModal";
import { animate, stagger } from "animejs";
import AddMemberModal from "./AddMemberModal";
import { TeamType } from "@/helpers/types";

function MyTeams() {
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const { teams } = useTeam();

  useEffect(() => {
    animate(".team-list-item", {
      scale: 1.1,
      translateY: "8rem",
      opacity: 1,
      duration: 400,
      delay: stagger(100),
    });
  }, []);

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
        team={selectedTeam}
        onClose={() => setShowAddMemberModal(false)}
      />
    </div>
  );
}

export default MyTeams;
