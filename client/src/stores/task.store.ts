import api from "@/config/api";
import { Task, TaskStatus } from "type";
import { create } from "zustand";
import useProjectStore from "./project.store";
import { toast } from "react-toastify";
import { apiErrorHandler } from "@/helpers/errorHandler";

interface TaskStore {
  loading: boolean;
  tasks: Task[];
  getDoneTasksCount: (tasks: string[]) => number;
  createTask: (data: Partial<Task> & { project: string }) => Promise<void>;
  updateTask: (taskId: string, updatedData: Partial<Task>) => Promise<void>;
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  assignTask: (taskId: string, userId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<boolean>;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  loading: true,
  tasks: [],

  getDoneTasksCount: (tasks) =>
    get().tasks.filter(
      (task) => tasks.includes(task._id) && task.status === "done",
    ).length,

  createTask: async (taskData) => {
    set({ loading: true });
    try {
      const { data }: { data: Task } = await api.post("/task", {
        taskData,
      });

      const projects = useProjectStore
        .getState()
        .projects.map((p) =>
          p._id === taskData.project
            ? { ...p, tasks: [data._id, ...p.tasks] }
            : p,
        );
      useProjectStore.setState({ projects });

      set({ tasks: [data, ...get().tasks] });

      toast.success(`New Task "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (taskId, updatedData) => {
    set({ loading: true });

    try {
      const { data }: { data: Task } = await api.put("/task", {
        id: taskId,
        updatedData,
      });

      set({ tasks: get().tasks.map((t) => (t._id === data._id ? data : t)) });

      toast.success("Task Updated successfully!");
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  changeTaskStatus: async (taskId, newStatus) => {
    set({ loading: false });

    try {
      const { data }: { data: Task } = await api.put("/task", {
        id: taskId,
        updateData: { status: newStatus },
      });

      set({ tasks: get().tasks.map((t) => (t._id === data._id ? data : t)) });
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  assignTask: async (taskId, userId) => {
    set({ loading: true });

    try {
      const { data }: { data: Task } = await api.put("/task/assign", {
        taskId,
        userId,
      });

      set({ tasks: get().tasks.map((t) => (t._id === data._id ? data : t)) });

      toast.success(`Assigned ${data.name} to the member`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (taskId) => {
    set({ loading: true });
    try {
      await api.delete(`/task/${taskId}`);

      set({ tasks: get().tasks.filter((t) => t._id !== taskId) });

      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTaskStore;
