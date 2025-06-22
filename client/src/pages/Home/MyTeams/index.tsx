import Headline from "@/components/Headline";
import { useTeam } from "@/contexts/TeamContext";

function MyTeams() {
  const { teams } = useTeam();

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-5rem)] p-6">
      <Headline
        title="Teams"
        rightLinkTitle="Create Team"
        rightLinkTo="/home/new-team"
      />

      <div className="flex flex-1 h-full space-x-6">
        {teams.map(team => <)}
      </div>
    </div>
  );
}

export default MyTeams;
