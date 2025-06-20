import { Card } from "@/components";
import api from "@/config/api";
import {
  formattedDateToday,
  getFormattedDateNDaysLater,
} from "@/helpers/date-formatter";
import { apiErrorHandler, formErrorsHandler } from "@/helpers/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

function NewProject() {
  const projectSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    description: z
      .string()
      .min(20, "Description must be 20 characters or more"),
    startDate: z.string().regex(/([0-9]{3})-[0-1][0-9]-[0-3][0-9]/g),
    endDate: z.string(),
  });
  type projectDataType = z.infer<typeof projectSchema>;

  const today = formattedDateToday();
  const weekLater = getFormattedDateNDaysLater(7);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<projectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: today,
      endDate: weekLater,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(formData: projectDataType) {
    if (formData.startDate > formData.endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }
    try {
      await api.post("/project", formData);
      toast.success("Project Created");
      reset();
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
            New Project
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Project Name
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
              Project Description
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
          <div className="flex space-x-6">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="startDate" className="text-sm font-semibold">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                placeholder="Start Date"
                title="Select a start date"
                className="w-full px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                {...register("startDate")}
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="endDate" className="text-sm font-semibold">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                placeholder="End Date"
                title="Select an end date"
                className="w-full mb-4 px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                {...register("endDate")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Create Project
          </button>
        </form>
      </div>
    </Card>
  );
}

export default NewProject;
