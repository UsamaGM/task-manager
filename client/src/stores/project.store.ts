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
  deleteProject: (projectId: string) => Promise<void>;
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
    const projects = get().projects;

    const originalProject = projects.find((p) => p._id === projectId);
    if (!originalProject) return;

    set({
      projects: projects.map((p) =>
        p._id === projectId ? { ...p, ...updatedData } : p,
      ),
    });

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
      set({
        projects: projects.map((p) =>
          p._id === projectId ? originalProject : p,
        ),
      });

      apiErrorHandler(error);
    }
  },

  deleteProject: async (projectId) => {
    const originalProjects = get().projects;
    const originalProject = originalProjects.find((p) => p._id === projectId);
    if (!originalProject) return;

    set({ projects: originalProjects.filter((p) => p._id !== projectId) });

    try {
      await api.delete(`/project/${projectId}`);

      toast.success(`Project "${originalProject.name}" deleted`);
    } catch (error) {
      set({ projects: [originalProject, ...get().projects] });
      apiErrorHandler(error);
    }
  },
}));

export default useProjectStore;
