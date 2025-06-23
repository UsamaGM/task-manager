import Headline from "@/components/Headline";
import { useTeam } from "@/contexts/TeamContext";
import TeamListItem from "./TeamListItem";
import { useState } from "react";
import CreateTeamModal from "./CreateTeamModal";

function MyTeams() {
  const [showModal, setShowModal] = useState(false);
  const { teams } = useTeam();

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-5rem)] p-6">
      <Headline
        title="Teams"
        rightButtonTitle="Create Team"
        rightButtonAction={() => setShowModal(true)}
      />
      <div className="flex flex-1 h-full space-x-6">
        {teams.map((team) => (
          <TeamListItem team={team} />
        ))}
      </div>
      <CreateTeamModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default MyTeams;
