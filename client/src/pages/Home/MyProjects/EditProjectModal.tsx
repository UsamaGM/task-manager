import ModalContainer from "@/components/ModalContainer";
import ProjectForm from "./ProjectForm";
import { getFormattedDate } from "@/helpers/date-formatter";
import { toast } from "react-toastify";
import { Project, ProjectModalProps } from "type";
import useProjectStore from "@/stores/project.store";

function EditProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  const loading = useProjectStore((s) => s.loading);
  const updateProject = useProjectStore((s) => s.updateProject);

  async function handleSubmit(data: Partial<Project>) {
    const isUpdated =
      data.name !== project.name ||
      data.description !== project.description ||
      data.startDate !== getFormattedDate(project.startDate) ||
      data.endDate !== getFormattedDate(project.endDate);
    if (!isUpdated) {
      toast.error("You did not change anything");
      return;
    }

    await updateProject(project._id, data);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Update Project ${project.name}`}>
      <ProjectForm
        isLoading={loading}
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
