import { getFormattedDate } from "@/helpers/date-formatter";
import { TaskType } from "@/helpers/types";
import {
  CheckIcon,
  BoltIcon,
  BellAlertIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface PropTypes {
  title: string;
  tasks: Array<TaskType>;
}

function TaskList({ title, tasks }: PropTypes) {
  return (
    <div className="flex flex-col flex-1 max-h-52 border border-gray-300 shadow rounded-2xl p-4">
      <h2 className="text-gray-700 font-bold">{title}</h2>
      {tasks.length ? (
        <table className="w-full mt-4 text-left">
          <thead className="text-sm text-gray-500">
            <tr className="h-2 text-sm">
              <th>Name</th>
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
                  <BoltIcon
                    title="in-progress"
                    className="size-5 stroke-2 text-yellow-500"
                  />
                ) : (
                  <BellAlertIcon
                    title="todo"
                    className="size-5 stroke-2 text-red-500"
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
                  <td className="py-3">{getFormattedDate(task.dueDate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="message flex flex-col justify-center items-center space-y-2 w-full h-full flex-1 text-gray-800 font-bold">
          <DocumentTextIcon className="size-8 text-red-500" />
          <h2 className="text-center">Nothing to show here</h2>
        </div>
      )}
    </div>
  );
}

export default TaskList;
