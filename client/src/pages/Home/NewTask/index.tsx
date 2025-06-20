import { Card } from "@/components";
import Dropdown from "@/components/Dropdown";
import api from "@/config/api";
import { formattedDateToday } from "@/helpers/date-formatter";
import { apiErrorHandler, formErrorsHandler } from "@/helpers/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function NewTask() {
  const projectSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    project: z.string(),
    dueDate: z.string().regex(/([0-9]{3})-[0-1][0-9]-[0-3][0-9]/g),
    priority: z.enum(["low", "medium", "high"]),
  });
  type projectDataType = z.infer<typeof projectSchema>;

  const today = formattedDateToday();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<projectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      project: "",
      dueDate: today,
      priority: "medium",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(formData: projectDataType) {
    try {
      await api.get("/project");
    } catch (error) {
      apiErrorHandler(error);
    }
    // TODO: Handle form submission logic here
    // This could involve sending the data to an API or updating the state
    // For now, we'll just log the data to the console
    // You can replace this with your actual submission logic

    console.log("Lets submit the form!", formData);
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
            <label htmlFor="project" className="text-sm font-semibold">
              Associated Project
            </label>
            <Dropdown
              placeholder="Select a project"
              options={[
                {
                  _id: "1",
                  name: "Project Alpha",
                  description: "",
                  endDate: "",
                  startDate: "",
                  status: "active",
                  tasks: [],
                },
                {
                  _id: "2",
                  name: "Project Beta",
                  description: "",
                  endDate: "",
                  startDate: "",
                  status: "active",
                  tasks: [],
                },
                {
                  _id: "3",
                  name: "Project Gamma",
                  description: "",
                  endDate: "",
                  startDate: "",
                  status: "active",
                  tasks: [],
                },
                {
                  _id: "4",
                  name: "Project Delta",
                  description: "",
                  endDate: "",
                  startDate: "",
                  status: "active",
                  tasks: [],
                },
              ]}
              {...register("project")}
            />
          </div>
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-sm font-semibold">
              Priority
            </label>
            <input
              id="priority"
              type="text"
              placeholder="Priority"
              title="How important it is?"
              className="w-full mb-4 px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              {...register("priority")}
            />
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
