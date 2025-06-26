import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { TaskStatusType, TaskType } from "@/helpers/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

interface TaskContextType {
  tasks: TaskType[];
  createTask: (data: Partial<TaskType> & { project: string }) => Promise<void>;
  changeTaskStatus: (
    taskId: string,
    newStatus: TaskStatusType
  ) => Promise<void>;
  updateTask: (taskId: string, formData: Partial<TaskType>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<boolean>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTask must be used within TaskProvider");

  return context;
}

export default function TaskProvider({ children }: { children: ReactNode }) {
  const { tasks: loaderData }: { tasks: TaskType[] } = useLoaderData();
  const [tasks, setTasks] = useState(loaderData);

  const createTask = useCallback(
    async (taskData: Partial<TaskType> & { project: string }) => {
      try {
        const { data }: { data: TaskType } = await api.post("/task", {
          taskData,
        });

        setTasks((prev) => [data, ...prev]);
        toast.success(`New Task "${data.name}"`);
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    []
  );

  const updateTask = useCallback(
    async (taskId: string, updateData: Partial<TaskType>) => {
      try {
        const { data }: { data: TaskType } = await api.put("/task", {
          id: taskId,
          updateData,
        });
        setTasks((prev) =>
          prev.map((task) => (task._id === data._id ? data : task))
        );
        toast.success("Task Updated successfully!");
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    []
  );

  const changeTaskStatus = useCallback(
    async (taskId: string, newStatus: TaskStatusType) => {
      try {
        const { data }: { data: TaskType } = await api.put("/task", {
          id: taskId,
          updateData: { status: newStatus },
        });

        setTasks((prev) =>
          prev.map((task) => (task._id === data._id ? data : task))
        );
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    []
  );

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await api.delete(`/task/${taskId}`);

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, changeTaskStatus, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
