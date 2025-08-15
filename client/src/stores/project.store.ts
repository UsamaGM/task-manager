import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { toast } from "react-toastify";
import { Project } from "type";
import { create } from "zustand";

interface ProjectStore {
  loading: boolean;
  projects: Project[];
  getProjectsArray: (projectIds: string[]) => Project[];
  getProjectsTaskCount: (projectIds: string[]) => number;
  getProjectWithTask: (taskId: string) => Project;
  createProject: (data: Project) => Promise<void>;
  updateProject: (projectId: string, updateData: any) => Promise<void>;
  deleteProject: (projectId: string) => Promise<boolean>;
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  loading: true,
  projects: [],

  getProjectsArray: (projectIds) =>
    get().projects.filter((project) => projectIds.includes(project._id)),

  getProjectsTaskCount: (projectIds) =>
    get().projects.reduce(
      (acc, project) =>
        projectIds.some((id) => id === project._id)
          ? project.tasks.length + acc
          : acc,
      0,
    ),

  getProjectWithTask: (taskId) =>
    get().projects.find((project) =>
      project.tasks.some((task) => task === taskId),
    )!,

  createProject: async (project) => {
    set({ loading: true });

    try {
      const { data }: { data: Project } = await api.post("/project", project);

      set({ projects: [data, ...get().projects] });
      toast.success(`Created the project "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  updateProject: async (projectId, updatedData) => {
    set({ loading: true });

    try {
      const { data }: { data: Project } = await api.put("/project", {
        id: projectId,
        data: updatedData,
      });

      set({
        projects: get().projects.map((p) =>
          p._id === data._id ? { ...p, ...data } : p,
        ),
      });

      if (!updatedData.status)
        toast.success(`Data Updated for Project "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteProject: async (projectId) => {
    set({ loading: true });

    try {
      await api.delete(`/project/${projectId}`);

      set({ projects: get().projects.filter((p) => p._id !== projectId) });

      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProjectStore;
