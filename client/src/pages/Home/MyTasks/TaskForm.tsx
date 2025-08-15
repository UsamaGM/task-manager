import {
  DateSelectorWithLabel,
  DropdownWithLabel,
  SubmitButton,
  TextAreaWithLabel,
  TextInputWithLabel,
} from "@/components";
import CancelButton from "@/components/CancelButton";
import PrioritySelectorWithLabel from "@/components/PrioritySelectorWithLabel";
import { formErrorsHandler } from "@/helpers/errorHandler";
import useProjectStore from "@/stores/project.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Task, TaskPriority } from "type";
import { z } from "zod";

interface PropTypes {
  isLoading: boolean;
  subtitle?: string;
  submitBtnTitle: string;
  defaultValues: {
    name: string;
    description: string;
    dueDate: string;
    priority: TaskPriority;
    project?: string;
  };
  onClose: () => void;
  onSubmit: (data: Partial<Task> & { project: string }) => Promise<void>;
}

function TaskForm({
  isLoading,
  subtitle,
  submitBtnTitle,
  defaultValues,
  onClose,
  onSubmit,
}: PropTypes) {
  const projects = useProjectStore((s) => s.projects);

  const formSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    description: z
      .string()
      .min(20, "Description must be 20 characters or more"),
    project: z.string(),
    dueDate: z.string(),
    priority: z.custom<TaskPriority>(),
  });

  type formDataTypes = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formDataTypes>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  formErrorsHandler(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      {subtitle && <p className="text-center">{subtitle}</p>}
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
      {!subtitle && (
        <DropdownWithLabel
          label="Associated Project"
          placeholder="Select a Project"
          options={projects}
          {...register("project")}
        />
      )}
      <div className="flex space-x-6 w-full">
        <DateSelectorWithLabel
          label="Due Date"
          id="dueDate"
          hint="When do you plan this submitted?"
          {...register("dueDate")}
        />
        <PrioritySelectorWithLabel
          label="Task Priority"
          value={"medium"}
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
