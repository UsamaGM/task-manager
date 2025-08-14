import ModalContainer from "@/components/ModalContainer";
import TaskForm from "./TaskForm";
import { useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { formattedDateToday } from "@/helpers/date-formatter";
import { ModalProps, Task, TaskPriority } from "type";

function CreateTaskModal({ isOpen, onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { createTask } = useTask();

  async function handleSubmit(formData: Partial<Task> & { project: string }) {
    setIsLoading(true);
    await createTask(formData);
    setIsLoading(false);
    onClose();
  }

  const today = formattedDateToday();

  if (!isOpen) return null;
  return (
    <ModalContainer title="Create Task">
      <TaskForm
        isLoading={isLoading}
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
