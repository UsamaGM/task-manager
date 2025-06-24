import { useAuth } from "@/contexts/AuthContext";
import { TeamType } from "@/helpers/types";
import {
  Cog6ToothIcon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { CubeIcon } from "@heroicons/react/24/solid";
import React, { ReactElement } from "react";

interface PropTypes {
  team: TeamType;
  handleAddMember: () => void;
}

function TeamListItem({ team, handleAddMember }: PropTypes) {
  const { user } = useAuth();
  const isAdmin = team.admin._id === user?._id;

  return (
    <div className="team-list-item scale-90 -translate-y-32 opacity-0 flex flex-col space-y-5 w-full h-fit rounded-2xl border border-gray-300 shadow sm:p-3 md:p-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">{team.name}</h2>
          <h4 className="text-sm font-semibold">
            Admin: {team.admin._id === user?._id ? "You" : team.admin.username}
          </h4>
        </div>
        {isAdmin ? (
          <div className="flex space-x-3 items-center">
            <IconButton onClick={handleAddMember}>
              <UserPlusIcon className="ml-0.5" />
            </IconButton>
            <IconButton onClick={() => {}}>
              <Cog6ToothIcon />
            </IconButton>
          </div>
        ) : (
          <IconButton onClick={() => {}}>
            <UserMinusIcon />
          </IconButton>
        )}
      </div>
      <p className="text-justify">{team.description}</p>
      <div className="flex justify-between space-x-5 w-full">
        <div className="flex flex-col space-y-3 max-w-sm w-full text-sm font-semibold">
          <span>
            {team.members.length +
              (team.members.length > 1 ? " Members" : " Member")}
          </span>
          {team.members.slice(0, 3).map((member) => (
            <div
              key={`${member._id}-${team._id}`}
              className="flex items-center space-x-2"
            >
              <UserIcon className="size-4 stroke-3" />
              <h3 className="flex-1 text-gray-800 font-bold text-sm">
                {member._id === user?._id ? "You" : member.username}
              </h3>
            </div>
          ))}
          {team.members.length > 3 && (
            <div className="flex items-center space-x-2">
              <UserIcon className="size-4 stroke-3" />
              <h3 className="flex-1 text-gray-800 font-bold text-sm">
                +{team.members.length - 3} more members
              </h3>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-3 max-w-sm w-full text-sm font-semibold">
          <span>
            {team.projects.length +
              (team.projects.length === 1 ? " Project" : " Projects")}
          </span>
          {team.projects.length ? (
            team.projects.map((project) => (
              <div
                key={`${project._id}-${team._id}`}
                className="flex space-x-2"
              >
                <CubeIcon className="size-4 stroke-3" />
                <h3>{project.name}</h3>
                <h4>{project.status}</h4>
              </div>
            ))
          ) : (
            <span>No projects assigned yet.</span>
          )}
        </div>
      </div>
      <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg border border-gray-300 shadow p-1 text-sm font-semibold cursor-pointer">
        Show Team Details
      </button>
    </div>
  );
}

export default TeamListItem;

interface ButtonPropTypes {
  children: ReactElement;
  onClick: () => void;
}

function IconButton({ children, onClick }: ButtonPropTypes) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 p-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg border border-gray-300 shadow transition-colors duration-300 cursor-pointer"
    >
      {children}
    </button>
  );
}
