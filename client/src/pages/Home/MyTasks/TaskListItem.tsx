import { getFormattedDate } from "@/helpers/date-formatter";
import { TaskPriorityType, TaskStatusType, TaskType } from "@/helpers/types";
import { BellIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  BoltIcon,
  EllipsisVerticalIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/contexts/ProjectContext";
import { useTeam } from "@/contexts/TeamContext";

interface PropTypes {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onAssign: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

function TaskListItem({ task, onEdit, onAssign, onDelete }: PropTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const { changeTaskStatus } = useTask();

  const projectId = useProject().getProjectWithTask(task._id)._id;
  const adminId = useTeam().findTeamWithProject(projectId)?.admin._id;
  const userId = useAuth().user?._id;
  const isAdmin = adminId === userId;
  const showExtraOptions = isAdmin || task.assignedTo?._id === userId;

  const handleClickOutside = useRef(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    isOpen
      ? document.addEventListener("click", handleClickOutside.current)
      : document.removeEventListener("click", handleClickOutside.current);
  });

  async function handleChangeStatus(newStatus: TaskStatusType) {
    await changeTaskStatus(task._id, newStatus);
  }

  const priorityConfig =
    task.priority === TaskPriorityType.LOW
      ? { title: "Low", color: "text-green-500" }
      : task.priority === TaskPriorityType.MEDIUM
      ? { title: "Medium", color: "text-yellow-600" }
      : { title: "High", color: "text-red-500" };
  const hasDueDatePassed =
    getFormattedDate(task.dueDate) <=
    getFormattedDate(new Date().toISOString());

  return (
    <div className="list-container-item -translate-x-32 flex flex-col shrink-0 space-y-2 min-h-46 mr-1 bg-white border border-gray-300 shadow rounded-xl p-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800">{task.name}</h3>
          <div className="flex space-x-2">
            {task.status !== TaskStatusType.DONE && (
              <h4 className="flex-1 font-semibold text-gray-600 text-sm">
                Due{" "}
                <span
                  className={
                    hasDueDatePassed ? "text-red-600" : "text-gray-600"
                  }
                >
                  {getFormattedDate(task.dueDate)}
                </span>
              </h4>
            )}
            <h4 className="flex flex-1 space-x-1 font-semibold text-gray-600 text-sm">
              <span>Priority</span>
              <span className={priorityConfig.color}>
                {priorityConfig.title}
              </span>
            </h4>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="hover:bg-blue-200 hover:text-blue-800 p-1 transition-colors duration-300 rounded-lg cursor-pointer"
        >
          <EllipsisVerticalIcon className="size-5 text-gray-900" />
        </button>
      </div>
      <p className="flex-1 text-gray-700 text-sm line-clamp-4 min-h-1/4">
        {task.description}
      </p>

      {task.assignedTo ? (
        <h3 className="text-gray-800 text-sm">
          Assigned to{" "}
          <span className="font-bold">
            {task.assignedTo._id === userId ? "You" : task.assignedTo.username}
          </span>
        </h3>
      ) : (
        <div className="flex justify-between items-center space-x-2">
          <span>Not assigned yet</span>
          {isAdmin && (
            <button
              onClick={() => onAssign(task)}
              className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg p-1 cursor-pointer"
            >
              Assign
            </button>
          )}
        </div>
      )}
      {isOpen && (
        <div className="flex flex-col fixed top-10 right-5 min-w-36 rounded-lg bg-white border border-gray-300 shadow">
          <button
            onClick={() => onEdit(task)}
            className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-blue-200 hover:text-blue-800 cursor-pointer"
          >
            <PencilIcon className="size-4" />
            <span className="font-bold">Edit</span>
          </button>
          <hr className="text-gray-300 mx-1" />
          {showExtraOptions && task.status !== TaskStatusType.TODO && (
            <>
              <button
                onClick={() => handleChangeStatus(TaskStatusType.TODO)}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-red-200 hover:text-red-800 cursor-pointer"
              >
                <BellIcon className="size-4 stroke-2" />
                <span className="font-bold">To Do</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          {showExtraOptions && task.status !== TaskStatusType.IN_PROGRESS && (
            <>
              <button
                onClick={() => handleChangeStatus(TaskStatusType.IN_PROGRESS)}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-yellow-200 hover:text-yellow-800 cursor-pointer"
              >
                <BoltIcon className="size-4" />
                <span className="font-bold">In Progress</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          {showExtraOptions && task.status !== TaskStatusType.DONE && (
            <>
              <button
                onClick={() => handleChangeStatus(TaskStatusType.DONE)}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-green-200 hover:text-green-800 cursor-pointer"
              >
                <CheckIcon className="size-4 stroke-3" />
                <span className="font-bold">Done</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          <button
            onClick={() => onDelete(task)}
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

export default TaskListItem;
