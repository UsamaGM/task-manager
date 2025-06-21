import PrioritySlider from "@/components/PrioritySlider";
import api from "@/config/api";
import { useTask } from "@/contexts/TaskContext";
import { getFormattedDate } from "@/helpers/date-formatter";
import { apiErrorHandler, formErrorsHandler } from "@/helpers/errorHandler";
import {
  TaskPriorityType,
  TaskType,
  TaskWithProjectType,
} from "@/helpers/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface PropTypes {
  task: TaskWithProjectType;
  onClose: () => void;
  onUpdate: (taskId: string, formData: any) => Promise<void>;
}

function EditForm({ task, onClose, onUpdate }: PropTypes) {
  const projectSchema = z.object({
    name: z.string().min(3, "Name must be 3 characters or more"),
    description: z
      .string()
      .min(20, "Description must be 20 characters or more"),
    dueDate: z.string().regex(/([0-9]{3})-[0-1][0-9]-[0-3][0-9]/g),
    priority: z.custom<TaskPriorityType>(),
  });

  type projectDataType = z.infer<typeof projectSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<projectDataType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
      dueDate: getFormattedDate(task.dueDate),
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(formData: projectDataType) {
    const isUpdated =
      formData.name !== task.name ||
      formData.description !== task.description ||
      formData.dueDate !== getFormattedDate(task.dueDate) ||
      formData.priority !== task.priority;

    if (!isUpdated) {
      toast.error("You did not change anything!");
      return;
    }

    const isDateInvalid =
      formData.dueDate < getFormattedDate(task.project.startDate) ||
      formData.dueDate > getFormattedDate(task.project.endDate);

    if (isDateInvalid) {
      toast.error("Select a date in the range of project lifetime.");
      return;
    }

    await onUpdate(task._id, formData);
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
        Edit Task
      </h2>
      <h3 className="font-semibold">
        Project: {task.project.name} (Starts{" "}
        {getFormattedDate(task.project.startDate)}, Ends{" "}
        {getFormattedDate(task.project.endDate)})
      </h3>
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
          <PrioritySlider value={task.priority} {...register("priority")} />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          type="button"
          className="bg-red-200 text-red-800 py-2 px-4 rounded-lg font-bold hover:bg-red-300 transition-all duration-300 cursor-pointer"
        >
          Cancel
        </button>
        <button className="bg-green-200 text-green-800 py-2 px-4 rounded-lg font-bold hover:bg-green-300 transition-all duration-300 cursor-pointer">
          Update
        </button>
      </div>
    </form>
  );
}

export default EditForm;
