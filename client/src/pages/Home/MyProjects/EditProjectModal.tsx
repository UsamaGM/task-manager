import ModalContainer from "@/components/ModalContainer";
import ProjectForm from "./ProjectForm";
import { useState } from "react";
import { getFormattedDate } from "@/helpers/date-formatter";
import { useProject } from "@/contexts/ProjectContext";
import { toast } from "react-toastify";
import { Project, ProjectModalProps } from "type";

function EditProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateProject } = useProject();

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

    console.log("Project", project, "Data", data);

    setIsLoading(true);
    await updateProject(project._id, data);
    setIsLoading(false);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalContainer title={`Update Project ${project.name}`}>
      <ProjectForm
        isLoading={isLoading}
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
