import { CancelButton, SubmitButton } from "@/components";
import ModalContainer from "@/components/ModalContainer";
import useTaskStore from "@/stores/task.store";
import { TaskModalProps } from "type";

function DeleteTaskModal({ isOpen, task, onClose }: TaskModalProps) {
  const deleteTask = useTaskStore((s) => s.deleteTask);

  function handleDeleteTask() {
    deleteTask(task._id);

    onClose();
  }

  if (!isOpen) return null;
  return (
    <ModalContainer title={`Delete Task "${task.name}"`} onClose={onClose}>
      <div className="flex flex-col space-y-10 mt-4">
        <h3>
          Are you sure you want to delete the task "{task.name}"? This action is
          permanent and all data associated with this team will be erased.
        </h3>

        <div className="flex space-x-5">
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={false}
            title="Delete Task"
            onClick={handleDeleteTask}
            className="border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white"
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteTaskModal;
