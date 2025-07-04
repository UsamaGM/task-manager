import ModalContainer from "@/components/ModalContainer";
import { useProject } from "@/contexts/ProjectContext";
import {
  formattedDateToday,
  getFormattedDateNDaysLater,
} from "@/helpers/date-formatter";
import { ModalPropTypes } from "@/helpers/types";
import { useState } from "react";
import ProjectForm from "./ProjectForm";

function CreateProjectModal({ isOpen, onClose }: ModalPropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const { createProject } = useProject();

  async function handleSubmit(formData: any) {
    setIsLoading(true);
    await createProject(formData);
    setIsLoading(false);
    onClose();
  }

  const today = formattedDateToday();
  const weekLater = getFormattedDateNDaysLater(7);

  if (!isOpen) return null;

  return (
    <ModalContainer title="Create Project">
      <ProjectForm
        isLoading={isLoading}
        submitBtnTitle="Create"
        defaultValues={{
          name: "",
          description: "",
          startDate: today,
          endDate: weekLater,
        }}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
}

export default CreateProjectModal;
