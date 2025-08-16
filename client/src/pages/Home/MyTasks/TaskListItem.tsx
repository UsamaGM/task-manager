import { getFormattedDate } from "@/helpers/date-formatter";
import { BellIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  BoltIcon,
  EllipsisVerticalIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "@/stores/auth.store";
import { Task, TaskStatus } from "type";
import useTeamStore from "@/stores/team.store";
import useTaskStore from "@/stores/task.store";
import useProjectStore from "@/stores/project.store";

interface PropTypes {
  task: Task;
  onEdit: (task: Task) => void;
  onAssign: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function TaskListItem({ task, onEdit, onAssign, onDelete }: PropTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const changeTaskStatus = useTaskStore((s) => s.changeTaskStatus);

  const project = useProjectStore((s) => s.getProjectWithTask(task._id));

  const userId = useAuthStore((s) => s.user?._id);
  const adminId = useTeamStore(
    (s) => s.findTeamWithProject(project._id)?.admin._id,
  );

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

  async function handleChangeStatus(newStatus: TaskStatus) {
    await changeTaskStatus(task._id, newStatus);
  }

  // const priorityConfig =
  //   task.priority === "low"
  //     ? { title: "Low", color: "text-green-500" }
  //     : task.priority === "medium"
  //       ? { title: "Medium", color: "text-yellow-600" }
  //       : { title: "High", color: "text-red-500" };
  const hasDueDatePassed =
    getFormattedDate(task.dueDate) <=
    getFormattedDate(new Date().toISOString());

  return (
    <div className="list-container-item -translate-x-32 flex flex-col shrink-0 space-y-2 min-h-46 mr-1 bg-white border border-gray-300 shadow rounded-xl p-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800">{task.name}</h3>
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
      <p
        title={task.description}
        className="flex-1 text-gray-700 text-justify text-sm line-clamp-2"
      >
        {task.description}
      </p>

      <p className="text-sm font-bold">Project: {project.name}</p>

      {task.status !== "done" && (
        <h4 className="font-semibold text-sm">
          Due:{" "}
          <span className={hasDueDatePassed ? "text-red-600" : "text-gray-600"}>
            {getFormattedDate(task.dueDate)}
          </span>
        </h4>
      )}

      {task.assignedTo ? (
        <h3 className="flex justify-between text-gray-800 text-sm">
          <span className="font-bold">
            Assigned to{" "}
            {task.assignedTo._id === userId ? "You" : task.assignedTo.username}
          </span>
          {isAdmin && (
            <button
              onClick={() => onAssign(task)}
              className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg p-1 cursor-pointer"
            >
              Change
            </button>
          )}
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
          {showExtraOptions && task.status !== "todo" && (
            <>
              <button
                onClick={() => handleChangeStatus("todo")}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-red-200 hover:text-red-800 cursor-pointer"
              >
                <BellIcon className="size-4 stroke-2" />
                <span className="font-bold">To Do</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          {showExtraOptions && task.status !== "in-progress" && (
            <>
              <button
                onClick={() => handleChangeStatus("in-progress")}
                className="flex items-center space-x-2 pl-2 pr-4 py-1 hover:bg-yellow-200 hover:text-yellow-800 cursor-pointer"
              >
                <BoltIcon className="size-4" />
                <span className="font-bold">In Progress</span>
              </button>
              <hr className="text-gray-300 mx-1" />
            </>
          )}
          {showExtraOptions && task.status !== "done" && (
            <>
              <button
                onClick={() => handleChangeStatus("done")}
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
