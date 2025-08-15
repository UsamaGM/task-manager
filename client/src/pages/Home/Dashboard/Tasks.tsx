import { TaskStatus } from "type";
import TaskList from "./TaskList";
import TitledSegment from "./TitledSegment";
import {
  getFormattedDate,
  getFormattedDateNDaysLater,
} from "@/helpers/date-formatter";
import useTaskStore from "@/stores/task.store";

export default function Tasks() {
  const tasks = useTaskStore((s) => s.tasks);
  const tasksLoading = useTaskStore((s) => s.loading);

  const thisWeekTasks = tasks.filter(
    (task) => getFormattedDate(task.dueDate) < getFormattedDateNDaysLater(7),
  );
  const todoTasks = tasks.filter((task) => task.status === TaskStatus.TODO);

  return (
    <TitledSegment title="Tasks" showLoading={tasksLoading}>
      <div className="flex w-full space-x-3">
        <TaskList
          title={`This week (${thisWeekTasks.length})`}
          tasks={thisWeekTasks}
        />
        <TaskList title={`To Do (${todoTasks.length})`} tasks={todoTasks} />
      </div>
    </TitledSegment>
  );
}
