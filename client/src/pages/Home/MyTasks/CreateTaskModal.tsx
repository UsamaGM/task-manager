import ModalContainer from "@/components/ModalContainer";
import { ModalPropTypes, TaskPriorityType, TaskType } from "@/helpers/types";
import TaskForm from "./TaskForm";
import { useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { formattedDateToday } from "@/helpers/date-formatter";

function CreateTaskModal({ isOpen, onClose }: ModalPropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const { createTask } = useTask();

  async function handleSubmit(
    formData: Partial<TaskType> & { project: string }
  ) {
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
          priority: TaskPriorityType.MEDIUM,
        }}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
}

export default CreateTaskModal;
