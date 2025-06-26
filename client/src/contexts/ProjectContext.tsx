import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { ProjectType } from "@/helpers/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

interface ProjectContextType {
  projects: ProjectType[];
  getProjectWithTask: (taskId: string) => ProjectType;
  createProject: (data: ProjectType) => Promise<void>;
  updateProject: (projectId: string, updatedData: any) => Promise<void>;
  deleteProject: (projectId: string) => Promise<boolean>;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function useProject() {
  const context = useContext(ProjectContext);

  if (!context)
    throw new Error("useProject must be used within ProjectProvider");

  return context;
}
function ProjectProvider({ children }: { children: ReactNode }) {
  const { projects: userProjects }: { projects: ProjectType[] } =
    useLoaderData();

  const [projects, setProjects] = useState(userProjects);

  function getProjectWithTask(taskId: string) {
    return projects.find((project) =>
      project.tasks.some((task) => task === taskId)
    )!;
  }

  async function createProject(project: ProjectType) {
    try {
      const { data }: { data: ProjectType } = await api.post(
        "/project",
        project
      );

      setProjects((prev) => [data, ...prev]);
      toast.success(`Created the project "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function updateProject(projectId: string, updatedData: any) {
    try {
      const { data }: { data: ProjectType } = await api.put("/project", {
        id: projectId,
        data: updatedData,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === data._id ? { ...p, ...data } : p))
      );

      if (!updatedData.status)
        toast.success(`Data Updated for Project "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function deleteProject(projectId: string) {
    try {
      await api.delete(`/project/${projectId}`);

      setProjects((prev) => prev.filter((p) => p._id !== projectId));

      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getProjectWithTask,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
