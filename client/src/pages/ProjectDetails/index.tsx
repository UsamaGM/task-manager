import { Card, NoXMessage } from "@/components";
import { getFormattedDate } from "@/helpers/date-formatter";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { stagger, Timeline } from "animejs";
import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import TeamCard from "../UserDetails/TeamCard";
import TaskCard from "./TaskCard";
import { DetailedProject } from "type";

const statusConfig = {
  active: {
    title: "Active",
    className: "text-yellow-600",
  },
  completed: {
    title: "Completed",
    className: "text-green-600",
  },
  "on-hold": {
    title: "On Hold",
    className: "text-red-600",
  },
};

function ProjectDetails() {
  const project: DetailedProject = useLoaderData();

  useEffect(() => {
    const tl = new Timeline({ delay: 400 });

    tl.add(".user-card", {
      translateY: [0, "-2.5rem", 0],
      duration: 300,
      ease: "inOutBounce",
    })
      .add(
        ".team-card",
        {
          translateX: [0, "2.5rem", 0],
          duration: 300,
          ease: "inOutBounce",
        },
        "-=200",
      )
      .add(
        ".task-card",
        {
          translateY: [0, "-2.5rem", 0],
          duration: 300,
          delay: stagger(200),
          ease: "inOutBounce",
        },
        "-=200",
      );

    tl.play();
  }, []);

  return (
    <Card>
      <div className="flex flex-col space-y-6 w-screen h-screen text-wrap p-6 overflow-auto">
        <div className="flex flex-col text-gray-800">
          <h2 className="text-3xl font-bold">
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
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Created By</p>
          <h2>
            {project.createdBy.username} ({project.createdBy.email}){" "}
            <Link
              to={`/user/${project.createdBy._id}`}
              className="text-blue-800 hover:underline"
            >
              Show user details
            </Link>
          </h2>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">What it's about</p>
          <div className="flex">
            <p className="description-card text-wrap">{project.description}</p>
          </div>
        </div>
        {project.assignedTo && (
          <div className="flex flex-col space-y-2">
            <p className="font-bold text-lg">Assigned To</p>
            <TeamCard team={project.assignedTo} />
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg">Tasks</p>
          {project.tasks.length ? (
            <div className="flex flex-wrap text-start gap-4 w-full">
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
