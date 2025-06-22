import { useProject } from "@/contexts/ProjectContext";
import { getFormattedDate } from "@/helpers/date-formatter";
import { ProjectStatusType, ProjectType } from "@/helpers/types";
import {
  ChartBarIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectEditForm from "./ProjectEditForm";

function getStartDateColor(date: string) {
  const startDate = new Date(date);
  const today = new Date();
  if (startDate <= today) return "text-green-600";
  return "text-gray-600";
}

function getEndDateColor(date: string) {
  if (!date) return "text-gray-700";

  const now = new Date();
  const due = new Date(date);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const severity = Math.max(0, 5 - diffDays);

  return `text-red-${severity * 100}`;
}

function ProjectListItem({ project }: { project: ProjectType }) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateProject, deleteProject } = useProject();

  const handleClickOutside = useCallback(function () {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    isOpen
      ? document.addEventListener("click", handleClickOutside)
      : document.removeEventListener("click", handleClickOutside);
  });

  const handleEdit = useCallback(function (e: any) {
    e.stopPropagation();

    const id = toast.warn(
      <ProjectEditForm
        project={project}
        onUpdate={updateProject}
        onClose={() => toast.dismiss(id)}
      />,
      {
        icon: false,
        autoClose: false,
        position: "bottom-center",
        role: "Edit Dialog",
        style: {
          border: "1px solid gray",
          minWidth: "40rem",
        },
      }
    );
  }, []);

  const handleChangeStatus = useCallback(
    async (newStatus: ProjectStatusType) => {
      await updateProject(project._id, { status: newStatus });
    },
    []
  );

  const handleDelete = useCallback(async () => {
    await deleteProject(project._id);
  }, []);

  return (
    <div className="list-container-item -translate-x-32 flex flex-col shrink-0 mr-1 space-y-2 bg-white border border-gray-300 shadow rounded-xl p-3">
      <div className="flex justify-between items-start">
        <div className="min-h-16">
          <h3 className="font-bold text-gray-800">{project.name}</h3>
          {project.status !== ProjectStatusType.ACTIVE && (
            <h4 className="font-semibold text-gray-600 text-sm">
              Starts{" "}
              <span className={getStartDateColor(project.startDate)}>
                {getFormattedDate(project.startDate)}
              </span>
            </h4>
          )}
          <h4 className="font-semibold text-gray-600 text-sm">
            Ends{" "}
            <span className={getEndDateColor(project.endDate)}>
              {getFormattedDate(project.endDate)}
            </span>
          </h4>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="hover:bg-blue-200 hover:text-blue-800 p-1 transition-colors duration-300 rounded-lg cursor-pointer"
        >
          <EllipsisVerticalIcon className="size-5 stroke-3 text-gray-900" />
        </button>
      </div>
      <p className="text-gray-700 text-sm line-clamp-4">
        {project.description}
      </p>

      {isOpen && (
        <div className="flex flex-col absolute top-10 right-5 min-w-36 py-2 rounded-lg bg-white border border-gray-300 shadow">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-blue-200 hover:text-blue-800 cursor-pointer"
          >
            <PencilIcon className="size-4" />
            <span className="font-bold">Edit</span>
          </button>
          <hr className="text-gray-300 mx-1" />
          {project.status !== ProjectStatusType.ACTIVE && (
            <>
              <button
                onClick={() => handleChangeStatus(ProjectStatusType.ACTIVE)}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-yellow-200 hover:text-green-800 cursor-pointer"
              >
                <ChartBarIcon className="size-4 stroke-2" />
                <span className="font-bold">Active</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          {project.status !== ProjectStatusType.ON_HOLD && (
            <>
              <button
                onClick={() => handleChangeStatus(ProjectStatusType.ON_HOLD)}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-red-200 hover:text-yellow-800 cursor-pointer"
              >
                <HandRaisedIcon className="size-4" />
                <span className="font-bold">On Hold</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          {project.status !== ProjectStatusType.COMPLETED && (
            <>
              <button
                onClick={() => handleChangeStatus(ProjectStatusType.COMPLETED)}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-green-200 hover:text-green-800 cursor-pointer"
              >
                <CheckIcon className="size-4 stroke-3" />
                <span className="font-bold">Done</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-2 py-1 hover:bg-red-200 hover:text-red-800 cursor-pointer"
          >
            <TrashIcon className="size-4" />
            <span className="font-bold">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectListItem;
