import {
  DateSelectorWithLabel,
  DropdownWithLabel,
  SubmitButton,
  TextAreaWithLabel,
  TextInputWithLabel,
} from "@/components";
import CancelButton from "@/components/CancelButton";
import PrioritySelectorWithLabel from "@/components/PrioritySelectorWithLabel";
import { useProject } from "@/contexts/ProjectContext";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { TaskPriorityType } from "@/helpers/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PropTypes {
  isLoading: boolean;
  submitBtnTitle: string;
  defaultValues: {
    name: string;
    description: string;
    dueDate: string;
    priority: TaskPriorityType;
  };
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

function TaskForm({
  isLoading,
  submitBtnTitle,
  defaultValues,
  onClose,
  onSubmit,
}: PropTypes) {
  const { projects } = useProject();

  const projectSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    description: z
      .string()
      .min(20, "Description must be 20 characters or more"),
    project: z.string(),
    dueDate: z.string(),
    priority: z.custom<TaskPriorityType>(),
  });

  type projectDataType = z.infer<typeof projectSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<projectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const isError = formErrorsHandler(errors);
  if (isError) {
    animate(".base-container", {
      translateX: [-25, 25, -25, 25, 0],
      duration: 500,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <TextInputWithLabel
        label="Task Name"
        id="name"
        placeholder="Improve Task Management"
        hint="Should be short and to the point"
        {...register("name")}
      />
      <TextAreaWithLabel
        label="Team Description"
        id="description"
        placeholder="This task is about..."
        hint="Should be descriptive, show what this is about"
        {...register("description")}
      />
      <DropdownWithLabel
        label="Associated Project"
        placeholder="Select a Project"
        options={projects}
        {...register("project")}
      />
      <div className="flex space-x-6 w-full">
        <DateSelectorWithLabel
          label="Due Date"
          id="dueDate"
          hint="When do you plan this submitted?"
          {...register("dueDate")}
        />
        <PrioritySelectorWithLabel
          label="Task Priority"
          value={TaskPriorityType.MEDIUM}
          {...register("priority")}
        />
      </div>
      <div className="flex justify-end space-x-6">
        <CancelButton onClick={onClose} />
        <SubmitButton isLoading={isLoading} title={submitBtnTitle} />
      </div>
    </form>
  );
}

export default TaskForm;
