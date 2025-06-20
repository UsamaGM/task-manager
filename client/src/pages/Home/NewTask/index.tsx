import { Card } from "@/components";
import Dropdown from "@/components/Dropdown";
import PrioritySlider from "@/components/PrioritySlider";
import api from "@/config/api";
import { ProjectType, TaskPriorityType } from "@/config/type";
import { formattedDateToday, getFormattedDate } from "@/helpers/date-formatter";
import { apiErrorHandler, formErrorsHandler } from "@/helpers/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

function NewTask() {
  const { projects }: { projects: Array<ProjectType> } = useLoaderData();

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
      <div className="form-container w-full h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col space-y-4 bg-white/30 p-8 rounded-xl shadow border border-gray-300 w-full max-w-2xl ${
            isError && "border-red-400 border-2"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            New Task
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Task Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              title="Short and to the point"
              className="w-full px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold">
              Task Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              title="Write such that anyone can understand"
              rows={4}
              className="w-full px-4 py-2 outline rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="project" className="text-sm font-semibold">
              Associated Project
            </label>
            <Dropdown
              placeholder="Select a project"
              options={projects}
              {...register("project")}
            />
          </div>
          <div className="flex space-x-6 w-full">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="dueDate" className="text-sm font-semibold">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                placeholder="Due Date"
                title="Select the due date"
                className="w-full px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                {...register("dueDate")}
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="priority" className="text-sm font-semibold">
                Priority
              </label>
              <PrioritySlider {...register("priority")} />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Create Task
          </button>
        </form>
      </div>
    </Card>
  );
}

export default NewTask;
