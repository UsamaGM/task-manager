import {
  DateSelectorWithLabel,
  SubmitButton,
  TextAreaWithLabel,
  TextInputWithLabel,
} from "@/components";
import CancelButton from "@/components/CancelButton";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormPropTypes {
  isLoading: boolean;
  submitBtnTitle: string;
  defaultValues: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function ProjectForm({
  isLoading,
  defaultValues,
  onClose,
  onSubmit,
  submitBtnTitle,
}: FormPropTypes) {
  const projectSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    description: z
      .string()
      .min(20, "Description must be 20 characters or more"),
    startDate: z.string(),
    endDate: z.string(),
  });
  type projectDataType = z.infer<typeof projectSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<projectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  function handleClose() {
    reset();
    onClose();
  }

  const isError = !!formErrorsHandler(errors);
  if (isError) {
    animate(".base-container", {
      translateX: [-25, 25, -25, 25, 0],
      duration: 500,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <TextInputWithLabel
        label="Project Name"
        id="name"
        placeholder="Realtime Chatting Application"
        hint="Should be short and to the point"
        {...register("name")}
      />
      <TextAreaWithLabel
        label="Project Description"
        id="description"
        placeholder="This project is about..."
        hint="Should be descriptive, such that anyone reading this can understand"
        {...register("description")}
      />
      <div className="flex space-x-6">
        <DateSelectorWithLabel
          label="Start Date"
          id="startDate"
          hint="When are you planning to start this project?"
          {...register("startDate")}
        />
        <DateSelectorWithLabel
          label="End Date"
          id="endDate"
          hint="When do you wish to finish this project?"
          {...register("endDate")}
        />
      </div>
      <div className="flex space-x-6">
        <CancelButton onClick={handleClose} />
        <SubmitButton isLoading={isLoading} title={submitBtnTitle} />
      </div>
    </form>
  );
}

export default ProjectForm;
