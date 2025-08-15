import ModalContainer from "@/components/ModalContainer";
import {
  formattedDateToday,
  getFormattedDateNDaysLater,
} from "@/helpers/date-formatter";
import ProjectForm from "./ProjectForm";
import { ModalProps } from "type";
import useProjectStore from "@/stores/project.store";

function CreateProjectModal({ isOpen, onClose }: ModalProps) {
  const loading = useProjectStore((s) => s.loading);
  const createProject = useProjectStore((s) => s.createProject);

  async function handleSubmit(formData: any) {
    await createProject(formData);

    onClose();
  }

  const today = formattedDateToday();
  const weekLater = getFormattedDateNDaysLater(7);

  if (!isOpen) return null;

  return (
    <ModalContainer title="Create Project">
      <ProjectForm
        isLoading={loading}
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
