import { Headline } from "@/components";
import { useTeamModals } from "@/hooks";
import Teams from "./Teams";

function MyTeams() {
  const {
    createTeam,
    addMemberToTeam,
    removeMemberFromTeam,
    editTeam,
    deleteTeam,
    leaveTeam,
    ModalComponents,
  } = useTeamModals();

  return (
    <div className="relative flex flex-col space-y-6 h-[calc(100vh-1rem)] p-6">
      <Headline
        title="My Teams"
        rightButtonTitle="Create Team"
        rightButtonAction={createTeam}
      />

      <Teams
        fns={{
          addMemberToTeam,
          removeMemberFromTeam,
          editTeam,
          deleteTeam,
          leaveTeam,
        }}
      />

      <ModalComponents />
    </div>
  );
}

export default MyTeams;
