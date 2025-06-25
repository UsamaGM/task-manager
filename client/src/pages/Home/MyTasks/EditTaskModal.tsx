import ModalContainer from "@/components/ModalContainer";
import { useTask } from "@/contexts/TaskContext";
import { getFormattedDate } from "@/helpers/date-formatter";
import { ModalPropTypes, TaskWithProjectType } from "@/helpers/types";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import { useState } from "react";

interface PropTypes extends ModalPropTypes {
  task: TaskWithProjectType;
}
function EditTaskModal({ isOpen, task, onClose }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateTask } = useTask();

  async function onSubmit(formData: any) {
    const isUpdated =
      formData.name !== task.name ||
      formData.description !== task.description ||
      formData.dueDate !== getFormattedDate(task.dueDate) ||
      formData.priority !== task.priority;

    if (!isUpdated) {
      toast.error("You did not change anything!");
      return;
    }

    const isDateInvalid =
      formData.dueDate < getFormattedDate(task.project.startDate) ||
      formData.dueDate > getFormattedDate(task.project.endDate);

    if (isDateInvalid) {
      toast.error("Select a date in the range of project lifetime.");
      return;
    }

    setIsLoading(true);
    await updateTask(task._id, formData);
    setIsLoading(false);
    onClose();
  }

  return (
    <ModalContainer title={`Update Task "${task.name}"`}>
      <TaskForm
        isLoading={isLoading}
        submitBtnTitle="Update"
        defaultValues={{
          name: task.name,
          description: task.description,
          dueDate: getFormattedDate(task.dueDate),
          priority: task.priority,
        }}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </ModalContainer>
  );
}

export default EditTaskModal;
