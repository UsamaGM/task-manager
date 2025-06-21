import { GroupedTasksListType } from "@/helpers/types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link, useLoaderData } from "react-router-dom";
import TaskGroupList from "./TaskGroupList";

function MyTasks() {
  const groupedTasks: GroupedTasksListType = useLoaderData();

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-5rem)] p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <Link
          to="/home/new-task"
          className="flex items-center space-x-1 p-3 shadow bg-blue-500 text-white hover:bg-blue-400 rounded-lg cursor-pointer transition-colors duration-500"
        >
          <PlusIcon className="size-5 stroke-2" />
          <span className="text-sm font-semibold">Create Task</span>
        </Link>
      </div>
      <div className="flex flex-1 h-full space-x-6">
        <TaskGroupList
          title="To Do"
          count={groupedTasks.todo.count}
          tasks={groupedTasks.todo.tasks}
        />
        <TaskGroupList
          title="In Progress"
          count={groupedTasks["in-progress"].count}
          tasks={groupedTasks["in-progress"].tasks}
        />
        <TaskGroupList
          title="Done"
          count={groupedTasks.done.count}
          tasks={groupedTasks.done.tasks}
        />
      </div>
    </div>
  );
}

export default MyTasks;
