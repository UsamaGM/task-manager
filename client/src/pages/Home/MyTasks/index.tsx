import TaskListContainer from "@/components/ListContainer";
import TaskListItem from "./TaskListItem";
import Headline from "@/components/Headline";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import NoXMessage from "@/components/NoXMessage";
import AssignTaskModal from "./AssignTaskModal";
import { Task, TaskStatus } from "type";
import useTaskStore from "@/stores/task.store";

function MyTasks() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasks = useTaskStore((s) => s.tasks);

  const todoTasks = tasks.filter((task) => task.status === TaskStatus.TODO);
  const inProgressTasks = tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS,
  );
  const doneTasks = tasks.filter((task) => task.status === TaskStatus.DONE);

  function onEdit(task: Task) {
    setSelectedTask(task);
    setShowEditTaskModal(true);
  }

  function onAssign(task: Task) {
    setSelectedTask(task);
    setShowAssignTaskModal(true);
  }

  function onDelete(task: Task) {
    setSelectedTask(task);
    setShowDeleteTaskModal(true);
  }

  return (
    <div className="relative flex flex-col space-y-6 h-[calc(100vh-1rem)] p-6">
      <Headline
        title="My Tasks"
        rightButtonTitle="Create Task"
        rightButtonAction={() => setShowCreateTaskModal(true)}
      />

      {tasks.length ? (
        <div className="flex flex-1 space-x-6 overflow-hidden">
          <TaskListContainer title={`To Do (${todoTasks.length})`}>
            {todoTasks.map((task) => (
              <TaskListItem
                key={task._id}
                task={task}
                onEdit={onEdit}
                onAssign={onAssign}
                onDelete={onDelete}
              />
            ))}
          </TaskListContainer>
          <TaskListContainer title={`In Progress (${inProgressTasks.length})`}>
            {inProgressTasks.map((task) => (
              <TaskListItem
                key={task._id}
                task={task}
                onEdit={onEdit}
                onAssign={onAssign}
                onDelete={onDelete}
              />
            ))}
          </TaskListContainer>
          <TaskListContainer title={`Done (${doneTasks.length})`}>
            {doneTasks.map((task) => (
              <TaskListItem
                key={task._id}
                task={task}
                onEdit={onEdit}
                onAssign={onAssign}
                onDelete={onDelete}
              />
            ))}
          </TaskListContainer>
        </div>
      ) : (
        <NoXMessage
          icon={<DocumentTextIcon />}
          message="No Tasks yet. Let's create one."
        />
      )}
      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
      />
      <EditTaskModal
        isOpen={showEditTaskModal}
        task={selectedTask!}
        onClose={() => setShowEditTaskModal(false)}
      />
      <AssignTaskModal
        isOpen={showAssignTaskModal}
        task={selectedTask!}
        onClose={() => setShowAssignTaskModal(false)}
      />
      <DeleteTaskModal
        isOpen={showDeleteTaskModal}
        task={selectedTask!}
        onClose={() => setShowDeleteTaskModal(false)}
      />
    </div>
  );
}

export default MyTasks;
