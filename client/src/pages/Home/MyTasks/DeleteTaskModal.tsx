import { Loader } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import { useTask } from "@/contexts/TaskContext";
import { ModalPropTypes, TaskType } from "@/helpers/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface PropTypes extends ModalPropTypes {
  task: TaskType;
}

function DeleteTaskModal({ isOpen, task, onClose }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteTask } = useTask();

  async function handleDeleteTask() {
    setIsLoading(true);
    const wasTaskDeleted = await deleteTask(task._id);
    if (wasTaskDeleted) toast.success(`Task "${task.name}" deleted`);
    setIsLoading(false);
    onClose();
  }

  if (!isOpen) return null;
  return (
    <ModalContainer title={`Delete Task "${task.name}"`}>
      <h3>
        Are you sure you want to delete the task "{task.name}"? This action is
        permanent and all data associated with this team will be erased.
      </h3>

      <div className="flex space-x-5">
        <button
          type="button"
          onClick={onClose}
          className="w-full p-2 hover:bg-red-200 hover:text-red-700 transition-colors duration-300 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDeleteTask}
          className="w-full p-2 bg-red-500 hover:bg-red-700 text-white transition-colors duration-300 rounded-lg cursor-pointer"
        >
          {isLoading ? <Loader size="small" /> : "Delete"}
        </button>
      </div>
    </ModalContainer>
  );
}

export default DeleteTaskModal;
