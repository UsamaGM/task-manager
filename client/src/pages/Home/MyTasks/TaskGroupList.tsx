import { getFormattedDate } from "@/helpers/date-formatter";
import { TaskWithProjectType } from "@/helpers/types";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { animate, stagger } from "animejs";
import { useEffect } from "react";

interface PropTypes {
  title: string;
  count: number;
  tasks: TaskWithProjectType[];
}

function getDateColor(dueDate: string) {
  if (!dueDate) return "text-gray-700";
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const severity = Math.max(0, 5 - diffDays);

  return `text-red-${severity * 100}`;
}

function TaskGroupList({ title, count, tasks }: PropTypes) {
  useEffect(() => {
    animate(".task-container", {
      translateX: "8rem",
      duration: 400,
      delay: stagger(100),
    });
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">
          {title} ({count})
        </h3>
        <div className="flex space-x-2 h-5 w-12">
          <PlusIcon />
          <EllipsisVerticalIcon />
        </div>
      </div>
      <div className="flex flex-col flex-1 min-h-0 space-y-4 mt-8 -mr-2 pr-2 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="task-container -translate-x-32 flex flex-col shrink-0 space-y-2 bg-white border border-gray-300 shadow rounded-xl p-3"
          >
            <div>
              <h3 className="font-bold text-gray-800">{task.name}</h3>
              <h4 className="font-semibold text-gray-600 text-sm">
                Due{" "}
                <span className={getDateColor(task.dueDate)}>
                  {getFormattedDate(task.dueDate)}
                </span>
              </h4>
            </div>
            <p className="text-gray-700 text-sm">{task.description}</p>
            <h3
              className={`font-bold ${
                task.assignedTo ? "text-gray-800" : "text-gray-600"
              }`}
            >
              {task.assignedTo ? task.assignedTo.username : "Not assigned yet"}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskGroupList;
