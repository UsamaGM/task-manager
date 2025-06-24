import PrioritySelectorWithLabel from "@/components/PrioritySelectorWithLabel";
import { getFormattedDate } from "@/helpers/date-formatter";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { ProjectType } from "@/helpers/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface PropTypes {
  project: ProjectType;
  onClose: () => void;
  onUpdate: (projectId: string, formData: any) => Promise<void>;
}

function ProjectEditForm({ project, onClose, onUpdate }: PropTypes) {
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
  } = useForm<projectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      startDate: getFormattedDate(project.startDate),
      endDate: getFormattedDate(project.endDate),
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(formData: projectDataType) {
    const isUpdated =
      formData.name !== project.name ||
      formData.description !== project.description ||
      formData.startDate !== getFormattedDate(project.startDate) ||
      formData.endDate !== getFormattedDate(project.endDate);

    if (!isUpdated) {
      toast.error("You did not change anything!");
      return;
    }

    await onUpdate(project._id, formData);
    onClose();
  }

  const isError = formErrorsHandler(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col space-y-4 rounded-xl w-full max-w-2xl text-gray-800 ${
        isError && "border-red-400 border-2"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Edit Project
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
      <div className="flex space-x-6 w-full">
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="startDate" className="text-sm font-semibold">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            placeholder="Start Date"
            title="Select the start date"
            className="w-full px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
            {...register("startDate")}
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="endDate" className="text-sm font-semibold">
            Start Date
          </label>
          <input
            id="endDate"
            type="date"
            placeholder="End Date"
            title="Select the end date"
            className="w-full px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
            {...register("endDate")}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          type="button"
          className=" text-red-800 py-2 px-4 rounded-lg font-bold hover:bg-red-300 transition-all duration-300 cursor-pointer"
        >
          Cancel
        </button>
        <button className="text-green-800 py-2 px-4 rounded-lg font-bold hover:bg-green-300 transition-all duration-300 cursor-pointer">
          Update
        </button>
      </div>
    </form>
  );
}

export default ProjectEditForm;
