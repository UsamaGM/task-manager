import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useProject } from "./ProjectContext";
import { Task, TaskStatus } from "type";

interface TaskContextType {
  tasks: Task[];
  getDoneTasksCount: (tasks: string[]) => number;
  createTask: (data: Partial<Task> & { project: string }) => Promise<void>;
  updateTask: (taskId: string, formData: Partial<Task>) => Promise<void>;
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  assignTask: (taskId: string, userId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<boolean>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTask must be used within TaskProvider");

  return context;
}

export default function TaskProvider({ children }: { children: ReactNode }) {
  const { tasks: loaderData }: { tasks: Task[] } = useLoaderData();

  const [tasks, setTasks] = useState(loaderData || []);
  const { setProjects } = useProject();

  const getDoneTasksCount = useCallback((t: string[]) => {
    return tasks.filter(
      (task) => t.includes(task._id) && task.status === TaskStatus.DONE,
    ).length;
  }, []);

  const createTask = useCallback(
    async (taskData: Partial<Task> & { project: string }) => {
      try {
        const { data }: { data: Task } = await api.post("/task", {
          taskData,
        });

        setProjects((prev) =>
          prev.map((p) =>
            p._id === taskData.project
              ? { ...p, tasks: [data._id, ...p.tasks] }
              : p,
          ),
        );
        setTasks((prev) => [data, ...prev]);

        toast.success(`New Task "${data.name}"`);
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    [],
  );

  const updateTask = useCallback(
    async (taskId: string, updateData: Partial<Task>) => {
      try {
        const { data }: { data: Task } = await api.put("/task", {
          id: taskId,
          updateData,
        });
        setTasks((prev) =>
          prev.map((task) => (task._id === data._id ? data : task)),
        );
        toast.success("Task Updated successfully!");
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    [],
  );

  const changeTaskStatus = useCallback(
    async (taskId: string, newStatus: TaskStatus) => {
      try {
        const { data }: { data: Task } = await api.put("/task", {
          id: taskId,
          updateData: { status: newStatus },
        });

        setTasks((prev) =>
          prev.map((task) => (task._id === data._id ? data : task)),
        );
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    [],
  );

  const assignTask = useCallback(async (taskId: string, userId: string) => {
    try {
      const { data }: { data: Task } = await api.put("/task/assign", {
        taskId,
        userId,
      });

      setTasks((prev) =>
        prev.map((task) => (task._id === data._id ? data : task)),
      );
      toast.success(`Assigned ${data.name} to the member`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }, []);

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
      value={{
        tasks,
        getDoneTasksCount,
        createTask,
        updateTask,
        changeTaskStatus,
        assignTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
