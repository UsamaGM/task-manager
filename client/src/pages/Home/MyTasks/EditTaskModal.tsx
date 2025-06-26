import ModalContainer from "@/components/ModalContainer";
import { useTask } from "@/contexts/TaskContext";
import { getFormattedDate } from "@/helpers/date-formatter";
import { ModalPropTypes, ProjectType, TaskType } from "@/helpers/types";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import { useEffect, useState } from "react";
import { useProject } from "@/contexts/ProjectContext";

interface PropTypes extends ModalPropTypes {
  task: TaskType;
}

function EditTaskModal({ isOpen, task, onClose }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateTask } = useTask();
  const { getProjectWithTask } = useProject();
  const project = isOpen ? getProjectWithTask(task._id) : null;

  async function onSubmit(formData: Partial<TaskType>) {
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
      formData.dueDate! < getFormattedDate(project!.startDate) ||
      formData.dueDate! > getFormattedDate(project!.endDate);

    if (isDateInvalid) {
      toast.error("Select a date in the range of project lifetime.");
      return;
    }

    setIsLoading(true);
    await updateTask(task._id, formData);
    setIsLoading(false);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Update Task "${task.name}"`}>
      <TaskForm
        isLoading={isLoading}
        subtitle={`Project: ${project?.name} (${getFormattedDate(
          project!.startDate
        )} - ${getFormattedDate(project!.endDate)})`}
        submitBtnTitle="Update"
        defaultValues={{
          name: task.name,
          description: task.description,
          dueDate: getFormattedDate(task.dueDate),
          priority: task.priority,
          project: project!._id,
        }}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </ModalContainer>
  );
}

export default EditTaskModal;
