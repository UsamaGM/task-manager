import { Card, NoXMessage } from "@/components";
import { DetailedUserType } from "@/helpers/types";
import {
  CubeTransparentIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useLoaderData } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import TeamCard from "./TeamCard";

function UserDetails() {
  const user: DetailedUserType = useLoaderData();

  return (
    <Card>
      <div className="flex flex-col space-y-8 w-screen h-max text-gray-800 p-6 overflow-auto">
        <div>
          <h1 className="text-4xl font-black my-6">User Details</h1>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <h4>{user.email}</h4>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Projects</p>
          {user.projects.length ? (
            <div className="flex flex-wrap items-center text-start gap-4 w-full">
              {user.projects.map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
          ) : (
            <NoXMessage
              icon={<CubeTransparentIcon />}
              message="No Projects Yet."
            />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Teams</p>
          {user.teams.length ? (
            <div className="flex flex-wrap items-center text-start gap-4 w-full">
              {user.teams.map((team) => (
                <TeamCard team={team} isAdmin={user._id === team.admin._id} />
              ))}
            </div>
          ) : (
            <NoXMessage
              icon={<UserGroupIcon />}
              message="Not a part of any team yet."
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default UserDetails;
