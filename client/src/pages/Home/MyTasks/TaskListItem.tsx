import { getFormattedDate } from "@/helpers/date-formatter";
import { TaskPriorityType, TaskStatusType, TaskType } from "@/helpers/types";
import { BellIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  BoltIcon,
  EllipsisVerticalIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import { useTask } from "@/contexts/TaskContext";

interface PropTypes {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

function TaskListItem({ task, onEdit, onDelete }: PropTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const { changeTaskStatus } = useTask();

  const handleClickOutside = useCallback(function () {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    isOpen
      ? document.addEventListener("click", handleClickOutside)
      : document.removeEventListener("click", handleClickOutside);
  });

  const handleChangeStatus = useCallback(async (newStatus: TaskStatusType) => {
    await changeTaskStatus(task._id, newStatus);
  }, []);

  const priorityConfig =
    task.priority === TaskPriorityType.LOW
      ? { title: "Low", color: "text-green-500" }
      : task.priority === TaskPriorityType.MEDIUM
      ? { title: "Medium", color: "text-yellow-500" }
      : { title: "High", color: "text-red-500" };
  const hasDueDatePassed =
    getFormattedDate(task.dueDate) <=
    getFormattedDate(new Date().toISOString());

  return (
    <div className="list-container-item -translate-x-32 flex flex-col shrink-0 space-y-2 min-h-46 mr-1 bg-white border border-gray-300 shadow rounded-xl p-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800">{task.name}</h3>
          <h4 className="font-semibold text-gray-600 text-sm">
            Due{" "}
            <span
              className={hasDueDatePassed ? "text-red-600" : "text-gray-600"}
            >
              {getFormattedDate(task.dueDate)}
            </span>
          </h4>
          <h4 className="font-semibold text-gray-600 text-sm">
            Priority{" "}
            <span className={priorityConfig.color}>{priorityConfig.title}</span>
          </h4>
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

      <h3
        className={`font-bold ${
          task.assignedTo ? "text-gray-800" : "text-gray-600"
        }`}
      >
        {task.assignedTo ? task.assignedTo.username : "Not assigned yet"}
      </h3>
      {isOpen && (
        <div className="flex flex-col absolute top-10 right-5 min-w-36 rounded-lg bg-white border border-gray-300 shadow">
          <button
            onClick={() => onEdit(task)}
            className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-blue-200 hover:text-blue-800 cursor-pointer"
          >
            <PencilIcon className="size-4" />
            <span className="font-bold">Edit</span>
          </button>
          <hr className="text-gray-300 mx-1" />
          {task.status !== TaskStatusType.TODO && (
            <>
              <button
                onClick={() => handleChangeStatus(TaskStatusType.TODO)}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-green-200 hover:text-green-800 cursor-pointer"
              >
                <BellIcon className="size-4 stroke-2" />
                <span className="font-bold">To Do</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          {task.status !== TaskStatusType.IN_PROGRESS && (
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
          {task.status !== TaskStatusType.DONE && (
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
