import ModalContainer from "@/components/ModalContainer";
import TaskForm from "./TaskForm";
import { formattedDateToday } from "@/helpers/date-formatter";
import { ModalProps, Task, TaskPriority } from "type";
import useTaskStore from "@/stores/task.store";

function CreateTaskModal({ isOpen, onClose }: ModalProps) {
  const loading = useTaskStore((s) => s.loading);
  const createTask = useTaskStore((s) => s.createTask);

  async function handleSubmit(formData: Partial<Task> & { project: string }) {
    await createTask(formData);

    onClose();
  }

  const today = formattedDateToday();

  if (!isOpen) return null;
  return (
    <ModalContainer title="Create Task">
      <TaskForm
        isLoading={loading}
        submitBtnTitle="Create"
        defaultValues={{
          name: "",
          description: "",
          dueDate: today,
          priority: TaskPriority.MEDIUM,
        }}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
}

export default CreateTaskModal;
