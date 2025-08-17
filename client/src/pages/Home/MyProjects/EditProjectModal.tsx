import ModalContainer from "@/components/ModalContainer";
import { getFormattedDate } from "@/helpers/date-formatter";
import useProjectStore from "@/stores/project.store";
import { toast } from "react-toastify";
import { Project, ProjectModalProps } from "type";
import ProjectForm from "./ProjectForm";

function EditProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  const updateProject = useProjectStore((s) => s.updateProject);

  function handleSubmit(data: Partial<Project>) {
    const isUpdated =
      data.name !== project.name ||
      data.description !== project.description ||
      data.startDate !== getFormattedDate(project.startDate) ||
      data.endDate !== getFormattedDate(project.endDate);
    if (!isUpdated) {
      toast.error("You did not change anything");
      return;
    }

    updateProject(project._id, data);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Update Project ${project.name}`} onClose={onClose}>
      <ProjectForm
        isLoading={false}
        onClose={onClose}
        submitBtnTitle="Update"
        defaultValues={{
          name: project.name,
          description: project.description,
          startDate: getFormattedDate(project.startDate),
          endDate: getFormattedDate(project.endDate),
        }}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
}

export default EditProjectModal;
