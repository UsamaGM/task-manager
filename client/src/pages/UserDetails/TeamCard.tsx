import { TeamType } from "@/helpers/types";
import { Link } from "react-router-dom";

function TeamCard({ team, isAdmin }: { team: TeamType; isAdmin: boolean }) {
  return (
    <Link
      to={`/team/${team._id}`}
      className="team-card flex flex-col flex-1 space-y-2 min-w-sm max-w-lg p-3 bg-white/20 border border-gray-300 shadow-md rounded-xl hover:scale-102 transition-transform duration-300"
    >
      <h3 className="font-bold line-clamp-1">
        {team.name} ({isAdmin ? "Admin" : "Member"})
      </h3>
      <h4 className="line-clamp-2 text-justify">{team.description}</h4>
      <div className="flex justify-between items-center">
        <h4>
          <b>{team.members.length}</b> Members
        </h4>
        <h4>
          <b>{team.projects.length}</b> Projects
        </h4>
      </div>
    </Link>
  );
}

export default TeamCard;
