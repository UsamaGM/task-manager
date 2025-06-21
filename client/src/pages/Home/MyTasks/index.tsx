import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import TaskListContainer from "./TaskListContainer";
import TaskListItem from "./TaskListItem";
import { useTask } from "@/contexts/TaskContext";

function MyTasks() {
  const { tasks } = useTask();

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
        <TaskListContainer title="To Do" count={tasks.todo.count}>
          {tasks.todo.tasks.map((task) => (
            <TaskListItem key={task._id} task={task} />
          ))}
        </TaskListContainer>
        <TaskListContainer
          title="In Progress"
          count={tasks["in-progress"].count}
        >
          {tasks["in-progress"].tasks.map((task) => (
            <TaskListItem key={task._id} task={task} />
          ))}
        </TaskListContainer>
        <TaskListContainer title="Done" count={tasks.done.count}>
          {tasks.done.tasks.map((task) => (
            <TaskListItem key={task._id} task={task} />
          ))}
        </TaskListContainer>
      </div>
    </div>
  );
}

export default MyTasks;
