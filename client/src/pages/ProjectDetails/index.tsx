import { Card, NoXMessage } from "@/components";
import { getFormattedDate } from "@/helpers/date-formatter";
import { DetailedProjectType } from "@/helpers/types";
import { Link, useLoaderData } from "react-router-dom";
import TaskCard from "./TaskCard";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const statusConfig = {
  active: {
    title: "Active",
    className: "text-yellow-700",
  },
  completed: {
    title: "Completed",
    className: "text-green-700",
  },
  "on-hold": {
    title: "On Hold",
    className: "text-red-700",
  },
};

function ProjectDetails() {
  const project: DetailedProjectType = useLoaderData();

  return (
    <Card>
      <h1 className="text-5xl font-black m-6">Project Details</h1>
      <div className="flex flex-col space-y-8 w-screen h-max text-center text-gray-800 p-6 overflow-auto">
        <div>
          <h2 className="text-2xl font-bold">
            {project.name} (
            <span className={statusConfig[project.status].className}>
              {statusConfig[project.status].title}
            </span>
            )
          </h2>
          <h4>
            Starting Date: <b>{getFormattedDate(project.startDate)}</b>
          </h4>
          <h4>
            Ending Date: <b>{getFormattedDate(project.endDate)}</b>
          </h4>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <h3 className="text-xl font-bold">Created By</h3>
          <Link
            to={`/user/${project.createdBy._id}`}
            className=" bg-white/20 border border-gray-300 hover:scale-105 shadow-md p-3 rounded-xl transition-transform duration-300"
          >
            <h2 className="text-lg font-bold">{project.createdBy.username}</h2>
            <h4>{project.createdBy.email}</h4>
            <h4>{project.createdBy.projects.length - 1} More Projects</h4>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <h3 className="text-xl font-bold">Description</h3>
          <p className="max-w-3xl bg-white/20 border border-gray-300 shadow-md p-3 rounded-xl">
            {project.description}
          </p>
        </div>
        {project.assignedTo && (
          <div className="flex flex-col justify-center items-center space-y-2">
            <h3 className="text-xl font-bold">Assigned To</h3>
            <div className=" bg-white/20 border border-gray-300 shadow-md p-3 rounded-xl">
              <h2 className="text-lg font-bold">{project.assignedTo.name}</h2>
              <h4>
                Admin{" "}
                <b>
                  {project.assignedTo.admin.username} (
                  {project.assignedTo.admin.email})
                </b>
              </h4>
              <h4
                title={project.assignedTo.description}
                className="line-clamp-2 mb-2 max-w-3xl"
              >
                {project.assignedTo.description}
              </h4>
              <div className="flex justify-evenly items-center">
                <span className="font-bold">
                  {project.assignedTo.members.length} Members
                </span>
                <Link
                  to={`/team/${project.assignedTo._id}`}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 border border-gray-400 hover:scale-105 text-sm font-bold rounded-lg px-4 py-1 transition-all duration-300"
                >
                  More About Team
                </Link>
                <span className="font-bold">
                  {project.assignedTo.projects.length - 1} Other Projects
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center items-center space-y-2">
          <h3 className="text-xl font-bold">Tasks</h3>
          {project.tasks.length ? (
            <div className="flex flex-wrap gap-4">
              {project.tasks.map((task) => (
                <TaskCard task={task} />
              ))}
            </div>
          ) : (
            <NoXMessage
              icon={<DocumentTextIcon />}
              message="No Tasks created yet"
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProjectDetails;
