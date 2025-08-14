import { getFormattedDate } from "@/helpers/date-formatter";
import { Task } from "type";

const priorityConfig = {
  low: {
    title: "Low",
    className: "text-green-700",
  },
  medium: {
    title: "Medium",
    className: "text-yellow-700",
  },
  high: {
    title: "High",
    className: "text-red-700",
  },
};

const statusConfig = {
  todo: {
    title: "To Do",
    className: "text-red-500",
  },
  "in-progress": {
    title: "In Progress",
    className: "text-yellow-500",
  },
  done: {
    title: "Done",
    className: "text-green-500",
  },
};

function TaskCard({ task }: { task: Task }) {
  return (
    <div
      key={task._id}
      className="flex flex-col flex-1 min-w-xs max-w-md bg-white/20 border border-gray-300 shadow-md rounded-xl p-3"
    >
      <h2 className="font-bold">{task.name}</h2>
      <h4 className="flex-1">{task.description}</h4>
      <div className="flex justify-evenly items-center gap-2 mt-2 text-sm font-bold">
        <h4 className={priorityConfig[task.priority].className}>
          Priority: {priorityConfig[task.priority].title}
        </h4>
        <h4>Due: {getFormattedDate(task.dueDate)}</h4>
        <h4 className={statusConfig[task.status].className}>
          Status: {statusConfig[task.status].title}
        </h4>
      </div>
    </div>
  );
}

export default TaskCard;
