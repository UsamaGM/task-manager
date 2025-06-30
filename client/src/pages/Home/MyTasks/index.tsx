import TaskListContainer from "../../../components/ListContainer";
import TaskListItem from "./TaskListItem";
import { useTask } from "@/contexts/TaskContext";
import Headline from "@/components/Headline";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import { TaskStatusType, TaskType } from "@/helpers/types";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import {
  DocumentTextIcon,
  KeyIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import NoXMessage from "@/components/NoXMessage";
import AssignTaskModal from "./AssignTaskModal";

function MyTasks() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const { tasks } = useTask();

  const todoTasks = tasks.filter((task) => task.status === TaskStatusType.TODO);
  const inProgressTasks = tasks.filter(
    (task) => task.status === TaskStatusType.IN_PROGRESS
  );
  const doneTasks = tasks.filter((task) => task.status === TaskStatusType.DONE);

  function onEdit(task: TaskType) {
    setSelectedTask(task);
    setShowEditTaskModal(true);
  }

  function onAssign(task: TaskType) {
    setSelectedTask(task);
    setShowAssignTaskModal(true);
  }

  function onDelete(task: TaskType) {
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
