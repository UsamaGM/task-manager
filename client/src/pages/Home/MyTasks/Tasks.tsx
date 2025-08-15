import { ListContainer, NoXMessage } from "@/components";
import useTaskStore from "@/stores/task.store";
import TaskListItem from "./TaskListItem";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { TasksProps } from "type";

export default function Tasks({
  fns: { editTask, assignTask, deleteTask },
}: TasksProps) {
  const tasks = useTaskStore((s) => s.tasks);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return tasks.length ? (
    <div className="flex flex-1 space-x-6 overflow-hidden">
      <ListContainer title={`To Do (${todoTasks.length})`}>
        {todoTasks.map((task) => (
          <TaskListItem
            key={task._id}
            task={task}
            onEdit={editTask}
            onAssign={assignTask}
            onDelete={deleteTask}
          />
        ))}
      </ListContainer>
      <ListContainer title={`In Progress (${inProgressTasks.length})`}>
        {inProgressTasks.map((task) => (
          <TaskListItem
            key={task._id}
            task={task}
            onEdit={editTask}
            onAssign={assignTask}
            onDelete={deleteTask}
          />
        ))}
      </ListContainer>
      <ListContainer title={`Done (${doneTasks.length})`}>
        {doneTasks.map((task) => (
          <TaskListItem
            key={task._id}
            task={task}
            onEdit={editTask}
            onAssign={assignTask}
            onDelete={deleteTask}
          />
        ))}
      </ListContainer>
    </div>
  ) : (
    <NoXMessage
      icon={<DocumentTextIcon />}
      message="No Tasks yet. Let's create one."
    />
  );
}
