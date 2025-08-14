import { CancelButton, SubmitButton } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import { useTask } from "@/contexts/TaskContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { TaskModalProps } from "type";

function DeleteTaskModal({ isOpen, task, onClose }: TaskModalProps) {
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
      <div className="flex flex-col space-y-10 mt-4">
        <h3>
          Are you sure you want to delete the task "{task.name}"? This action is
          permanent and all data associated with this team will be erased.
        </h3>

        <div className="flex space-x-5">
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={isLoading}
            title="Delete Task"
            onClick={handleDeleteTask}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteTaskModal;
