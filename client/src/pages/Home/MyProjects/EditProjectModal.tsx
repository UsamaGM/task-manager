import ModalContainer from "@/components/ModalContainer";
import { ModalPropTypes, ProjectType } from "@/helpers/types";
import ProjectForm from "./ProjectForm";
import { useState } from "react";
import { getFormattedDate } from "@/helpers/date-formatter";
import { useProject } from "@/contexts/ProjectContext";
import { toast } from "react-toastify";

interface PropTypes extends ModalPropTypes {
  project: ProjectType;
}

function EditProjectModal({ isOpen, project, onClose }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateProject } = useProject();

  async function handleSubmit(data: Partial<ProjectType>) {
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
