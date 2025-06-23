import { useState } from "react";
import { useTeam } from "@/contexts/TeamContext";
import { Headline } from "@/components";
import TeamListItem from "./TeamListItem";
import CreateTeamModal from "./CreateTeamModal";

function MyTeams() {
  const [showModal, setShowModal] = useState(false);
  const { teams } = useTeam();

  return (
    <div className="flex flex-col space-y-6 h-screen p-6">
      <Headline
        title="Teams"
        rightButtonTitle="Create Team"
        rightButtonAction={() => setShowModal(true)}
      />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 overflow-y-scroll">
        {teams.map((team) => (
          <TeamListItem team={team} />
        ))}
      </div>
      <CreateTeamModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default MyTeams;
