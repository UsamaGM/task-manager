import {
  CheckIcon,
  ClockIcon,
  FlagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface PropTypes {
  title: string;
  tasks: Array<{
    name: string;
    project: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "done";
  }>;
}

function TaskList({ title, tasks }: PropTypes) {
  return (
    <div className="flex-1 gap-2 border border-gray-300 shadow rounded-lg p-4 bg-white">
      <h2 className="text-gray-700 font-bold mb-4">{title}</h2>
      <table className="min-w-full text-left">
        <thead className="text-sm text-gray-500">
          <tr className="h-2 text-sm">
            <th>Name</th>
            <th>Project</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody className="text-sm font-semibold text-gray-600">
          {tasks.map((task, index) => {
            const statusIcon =
              task.status === "done" ? (
                <CheckIcon className="size-5 text-[#447A65] stroke-3 rotate-10" />
              ) : task.status === "in-progress" ? (
                <ClockIcon className="size-5 stroke-3 text-yellow-500" />
              ) : (
                <XMarkIcon className="size-5 stroke-3 text-red-500" />
              );

            const flagColor =
              task.priority === "high"
                ? "text-red-700"
                : task.priority === "medium"
                ? "text-yellow-500"
                : "text-gray-400";

            return (
              <tr className="border-t border-gray-300 h-2" key={index}>
                <td className="py-3 flex space-x-2">
                  {statusIcon}
                  <span>{task.name}</span>
                  <FlagIcon className={`size-5 ${flagColor}`} />
                </td>
                <td className="py-3">{task.project}</td>
                <td className="py-3">{task.dueDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
