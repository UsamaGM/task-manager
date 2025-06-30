import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/contexts/ProjectContext";
import { TeamType } from "@/helpers/types";
import {
  ArrowRightStartOnRectangleIcon,
  CubeIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface PropTypes {
  team: TeamType;
  handleAddMember: () => void;
  handleRemoveMember: () => void;
  handleEditTeam: () => void;
  handleDeleteTeam: () => void;
  handleLeaveTeam: () => void;
}

function TeamListItem({
  team,
  handleAddMember,
  handleRemoveMember,
  handleEditTeam,
  handleDeleteTeam,
  handleLeaveTeam,
}: PropTypes) {
  const { getProjectsTaskCount } = useProject();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = team.admin._id === user?._id;

  const taskCount = getProjectsTaskCount(team.projects);

  return (
    <div className="team-list-item scale-90 -translate-y-32 opacity-0 flex flex-col space-y-5 w-full h-full rounded-2xl border border-gray-300 shadow sm:p-3 md:p-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">{team.name}</h2>
          <h4 className="text-sm font-semibold">
            Admin: {team.admin._id === user?._id ? "You" : team.admin.username}
          </h4>
        </div>
        {isAdmin ? (
          <div className="flex space-x-3 items-center">
            <IconButton
              hint="Add new member(s) to this team"
              onClick={handleAddMember}
            >
              <UserPlusIcon className="ml-0.5 stroke-2" />
            </IconButton>
            <IconButton
              hint="Remove member(s) from this team"
              onClick={handleRemoveMember}
            >
              <UserMinusIcon className="m-[0.5px] stroke-2" />
            </IconButton>
            <IconButton
              hint="Edit team name or description"
              onClick={handleEditTeam}
            >
              <PencilIcon className="stroke-2 m-[1.5px]" />
            </IconButton>
            <IconButton hint="Delete this team" onClick={handleDeleteTeam}>
              <TrashIcon className="stroke-2 m-[0.5px]" />
            </IconButton>
          </div>
        ) : (
          <IconButton hint="Leave this team" onClick={handleLeaveTeam}>
            <ArrowRightStartOnRectangleIcon />
          </IconButton>
        )}
      </div>
      <p className="text-justify line-clamp-2">{team.description}</p>
      <div className="flex justify-between space-x-5 w-full flex-1 text-sm font-bold">
        <div className="flex items-center space-x-2">
          <UserIcon className="size-5 stroke-2" />
          <h4>
            {team.members.length +
              (team.members.length === 1 ? " Member" : " Members")}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <CubeIcon className="size-5 stroke-2" />
          <h4>
            {team.projects.length +
              (team.projects.length === 1 ? " Project" : " Projects")}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <DocumentTextIcon className="size-5 stroke-2" />
          <h4>{taskCount + (taskCount === 1 ? " Task" : " Tasks")}</h4>
        </div>
      </div>
      <button
        onClick={() => navigate("/team/" + team._id)}
        className="bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg border border-gray-300 shadow p-1 text-sm font-semibold cursor-pointer"
      >
        Show Team Details
      </button>
    </div>
  );
}

export default TeamListItem;

interface ButtonPropTypes {
  children: ReactElement;
  onClick: () => void;
  hint: string;
}

function IconButton({ children, onClick, hint }: ButtonPropTypes) {
  return (
    <button
      title={hint}
      onClick={onClick}
      className="flex items-center justify-center size-8 p-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg border border-gray-300 shadow transition-colors duration-300 cursor-pointer"
    >
      {children}
    </button>
  );
}
