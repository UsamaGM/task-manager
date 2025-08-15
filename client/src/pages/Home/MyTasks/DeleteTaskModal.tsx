import { CancelButton, SubmitButton } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import useTaskStore from "@/stores/task.store";
import { toast } from "react-toastify";
import { TaskModalProps } from "type";

function DeleteTaskModal({ isOpen, task, onClose }: TaskModalProps) {
  const loading = useTaskStore((s) => s.loading);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  async function handleDeleteTask() {
    const wasTaskDeleted = await deleteTask(task._id);
    if (wasTaskDeleted) toast.success(`Task "${task.name}" deleted`);

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
            isLoading={loading}
            title="Delete Task"
            onClick={handleDeleteTask}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteTaskModal;
