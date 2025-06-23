import api from "@/config/api";

import {
  Card,
  DropdownWithLabel,
  FormContainer,
  TextAreaWithLabel,
  TextInputWithLabel,
  PrioritySelectorWithLabel,
  DateSelectorWithLabel,
  SubmitButton,
} from "@/components";

import { animate } from "animejs";
import { toast } from "react-toastify";

import { ProjectType, TaskPriorityType } from "@/helpers/types";
import { formattedDateToday, getFormattedDate } from "@/helpers/date-formatter";
import { apiErrorHandler, formErrorsHandler } from "@/helpers/errorHandler";

import { useLoaderData } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function NewTask() {
  const projects: ProjectType[] = useLoaderData();

  const projectSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    description: z
      .string()
      .min(20, "Description must be 20 characters or more"),
    project: z.string().min(1, "Select a project please"),
    dueDate: z.string().regex(/([0-9]{3})-[0-1][0-9]-[0-3][0-9]/g),
    priority: z.custom<TaskPriorityType>(),
  });
  type projectDataType = z.infer<typeof projectSchema>;

  const today = formattedDateToday();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<projectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      project: "",
      dueDate: today,
      priority: TaskPriorityType.MEDIUM,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(formData: projectDataType) {
    const selectedProject = projects.find((p) => p._id === formData.project);
    if (!selectedProject) {
      toast.error("Please select a valid project!");
      return;
    }
    const isDateInvalid =
      formData.dueDate < getFormattedDate(selectedProject.startDate) ||
      formData.dueDate > getFormattedDate(selectedProject.endDate);

    if (isDateInvalid) {
      toast.error("Select a date in the range of project lifetime.");
      return;
    }

    try {
      const response = await api.post("/task", formData);
      toast.success("Task created successfully!");
      reset();

      console.log(response.data);
    } catch (error) {
      apiErrorHandler(error);

      animate(".form-container", {
        translateX: [-12, 12, -12, 12, 0],
        duration: 500,
      });
    }
  }

  const isError = formErrorsHandler(errors);

  return (
    <Card>
      <FormContainer
        title="New Task"
        isError={!!isError}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInputWithLabel
          label="Task Name"
          id="name"
          placeholder="Optimize Frontend for better UX"
          hint="Should be short and to the point"
          {...register("name")}
        />

        <TextAreaWithLabel
          label="Task Description"
          id="description"
          placeholder="In this task we will work on optimizing the frontend..."
          hint="Should be descriptive, anyone reading this should be able to understand"
          {...register("description")}
        />

        <DropdownWithLabel
          label="Associated Project"
          placeholder="Select a project"
          options={projects}
          {...register("project")}
        />

        <div className="flex space-x-6 w-full">
          <DateSelectorWithLabel
            label="Due Date"
            id="dueDate"
            hint="You need to finish the task before this date"
            {...register("dueDate")}
          />

          <PrioritySelectorWithLabel
            label="Priority"
            {...register("priority")}
          />
        </div>
        <SubmitButton title="Create Task" />
      </FormContainer>
    </Card>
  );
}

export default NewTask;
