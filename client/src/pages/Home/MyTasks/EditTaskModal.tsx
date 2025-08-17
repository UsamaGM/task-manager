import ModalContainer from "@/components/ModalContainer";
import { getFormattedDate } from "@/helpers/date-formatter";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import { Task, TaskModalProps } from "type";
import useTaskStore from "@/stores/task.store";
import useProjectStore from "@/stores/project.store";

function EditTaskModal({ isOpen, task, onClose }: TaskModalProps) {
  const updateTask = useTaskStore((s) => s.updateTask);

  const getProjectWithTask = useProjectStore((s) => s.getProjectWithTask);
  const project = isOpen ? getProjectWithTask(task._id) : null;

  function onSubmit(formData: Partial<Task>) {
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

    updateTask(task._id, formData);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Update Task "${task.name}"`} onClose={onClose}>
      <TaskForm
        isLoading={false}
        subtitle={`Project: ${project?.name} (${getFormattedDate(
          project!.startDate,
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
