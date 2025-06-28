import { Card, NoXMessage } from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import { getFormattedDate } from "@/helpers/date-formatter";
import { DetailedTeamType, ProjectType, UserType } from "@/helpers/types";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { stagger, Timeline } from "animejs";
import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

function TeamDetails() {
  const { user } = useAuth();
  const team: DetailedTeamType = useLoaderData();
  const isAdmin = user?._id === team.admin._id;

  useEffect(() => {
    const tl = new Timeline({ delay: 400 });

    tl.add(".description-card", {
      rotateY: [0, 360],
      duration: 500,
    })
      .add(".user-card", {
        translateY: [0, "-2.5rem", 0],
        duration: 300,
        delay: stagger(200),
        ease: "inOutBounce",
      })
      .add(".project-card", {
        translateX: [0, "2.5rem", 0],
        duration: 300,
        delay: stagger(200),
        ease: "inOutBounce",
      });

    tl.play();
  }, []);

  return (
    <Card>
      <div className="flex flex-col text-center space-y-6 w-screen h-screen text-wrap p-6 overflow-auto">
        <div className="flex flex-col text-gray-800">
          <h2 className="text-3xl font-bold">{team.name}</h2>
          <h4>
            <b>Created</b> {getFormattedDate(team.createdAt)}
          </h4>
          <h4>
            <b>Last Updated</b> {getFormattedDate(team.updatedAt)}
          </h4>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">
            {isAdmin ? "Description" : "What they have to say"}
          </p>
          <div className="flex items-center justify-center">
            <p className="description-card text-wrap max-w-3xl p-3 bg-white/20 border border-gray-300 shadow-md rounded-xl">
              {team.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Members</p>
          <div className="flex flex-wrap justify-center items-center text-start gap-4 w-full">
            <UserCard user={team.admin} isAdmin />
            {team.members.map((member) => (
              <UserCard user={member} />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Projects</p>
          {team.projects.length ? (
            <div className="flex flex-wrap justify-center items-center text-start space-x-4 w-full">
              {team.projects.map((project) => (
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
      </div>
    </Card>
  );
}

interface UserCardPropTypes {
  user: UserType;
  isAdmin?: boolean;
}

export default TeamDetails;

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <Link
      to={`/project/${project._id}`}
      className="project-card flex flex-col space-y-2 max-w-md p-3 bg-white/20 border border-gray-300 shadow-md rounded-xl hover:scale-102 transition-transform duration-300"
    >
      <h3 className="font-bold">{project.name}</h3>
      <h4 className="line-clamp-2 text-justify">{project.description}</h4>
      <h4>
        From <b>{getFormattedDate(project.startDate)}</b> to{" "}
        <b>{getFormattedDate(project.endDate)}</b>
      </h4>
      <div className="flex justify-between items-center">
        <h4>
          <b>{project.tasks.length}</b> Tasks
        </h4>
        <h4>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </h4>
      </div>
    </Link>
  );
}

function UserCard({ user, isAdmin = false }: UserCardPropTypes) {
  return (
    <Link
      to={`/user/${user._id}`}
      className="user-card flex flex-col space-y-2 max-w-md p-3 bg-white/20 border border-gray-300 shadow-md rounded-xl hover:scale-105 transition-transform duration-300"
    >
      <h3 className="font-bold">
        {user.username} {isAdmin && "(Admin)"}
      </h3>
      <h4 className="text-sm">{user.email}</h4>
    </Link>
  );
}
