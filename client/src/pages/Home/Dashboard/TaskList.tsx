import { TaskType } from "@/helpers/types";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface PropTypes {
  title: string;
  tasks: Array<TaskType>;
}

function TaskList({ title, tasks }: PropTypes) {
  return (
    <div className="flex-1 gap-2 border border-gray-300 shadow rounded-2xl p-4 bg-white">
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
                <CheckIcon
                  title="done"
                  className="size-5 text-[#447A65] stroke-3 rotate-10"
                />
              ) : task.status === "in-progress" ? (
                <ClockIcon
                  title="in-progress"
                  className="size-5 stroke-3 text-yellow-500"
                />
              ) : (
                <XMarkIcon
                  title="todo"
                  className="size-5 stroke-3 text-red-500"
                />
              );

            const dotColor =
              task.priority === "high"
                ? "bg-red-600"
                : task.priority === "medium"
                ? "bg-yellow-500"
                : "bg-blue-400";

            return (
              <tr className="border-t border-gray-300 h-2" key={index}>
                <td className="py-3 flex items-center space-x-2">
                  {statusIcon}
                  <span>{task.name}</span>
                  <div
                    title={"Priority: " + task.priority}
                    className={`size-3 rounded-full ${dotColor} hover:scale-110 transition-transform duration-300`}
                  />
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
