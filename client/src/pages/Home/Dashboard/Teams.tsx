import useTeamStore from "@/stores/team.store";
import TitledSegment from "./TitledSegment";
import ActionItem from "./ActionItem";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Teams() {
  const teams = useTeamStore((s) => s.teams);
  const teamsLoading = useTeamStore((s) => s.loading);

  const navigate = useNavigate();

  return (
    <TitledSegment title="Teams" showLoading={teamsLoading}>
      <div className="teams-container flex w-full space-x-3 overflow-x-auto pb-2">
        {teams.map((team) => (
          <ActionItem
            key={team._id}
            icon={<UserGroupIcon />}
            title={team.name}
            subtitle={
              <div className="flex flex-col items-start">
                <p className="line-clamp-2 text-justify">{team.description}</p>
              </div>
            }
            onClick={() => navigate(`/team/${team._id}`)}
          />
        ))}
      </div>
    </TitledSegment>
  );
}
