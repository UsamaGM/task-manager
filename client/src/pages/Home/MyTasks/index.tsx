import TaskListContainer from "../../../components/ListContainer";
import TaskListItem from "./TaskListItem";
import { useTask } from "@/contexts/TaskContext";
import Headline from "@/components/Headline";

function MyTasks() {
  const { tasks } = useTask();

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-5rem)] p-6">
      <Headline
        title="My Tasks"
        rightLinkTitle="Create Task"
        rightLinkTo="/home/new-task"
      />

      <div className="flex flex-1 h-full space-x-6">
        <TaskListContainer title={`To Do (${tasks.todo.count})`}>
          {tasks.todo.tasks.map((task) => (
            <TaskListItem key={task._id} task={task} />
          ))}
        </TaskListContainer>
        <TaskListContainer
          title={`In Progress (${tasks["in-progress"].count})`}
        >
          {tasks["in-progress"].tasks.map((task) => (
            <TaskListItem key={task._id} task={task} />
          ))}
        </TaskListContainer>
        <TaskListContainer title={`Done (${tasks.done.count})`}>
          {tasks.done.tasks.map((task) => (
            <TaskListItem key={task._id} task={task} />
          ))}
        </TaskListContainer>
      </div>
    </div>
  );
}

export default MyTasks;
