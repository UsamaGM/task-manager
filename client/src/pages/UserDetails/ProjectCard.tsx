import { getFormattedDate } from "@/helpers/date-formatter";
import { ProjectType } from "@/helpers/types";
import { Link } from "react-router-dom";

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <Link
      to={`/project/${project._id}`}
      className="project-card flex flex-col flex-1 min-w-sm space-y-2 h-fit p-3 bg-white/20 border border-gray-300 shadow-md rounded-xl hover:scale-102 transition-transform duration-300"
    >
      <h3 className="font-bold line-clamp-1">{project.name}</h3>
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

export default ProjectCard;
