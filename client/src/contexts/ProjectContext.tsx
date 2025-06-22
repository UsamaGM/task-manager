import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { ProjectStatusType, ProjectType } from "@/helpers/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

interface ProjectContextType {
  projects: ProjectType[];
  updateProject: (projectId: string, updatedData: any) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function useProject() {
  const context = useContext(ProjectContext);

  if (!context)
    throw new Error("useProject must be used within ProjectProvider");

  return context;
}

function ProjectProvider({ children }: { children: ReactNode }) {
  const userProjects: ProjectType[] = useLoaderData();
  const [projects, setProjects] = useState(userProjects);

  async function updateProject(projectId: string, updatedData: any) {
    try {
      const { data }: { data: ProjectType } = await api.put("/project", {
        id: projectId,
        data: updatedData,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === data._id ? { ...p, ...data } : p))
      );

      if (!data.status) toast.success("Project Data Updated");
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function deleteProject(projectId: string) {
    try {
      const {
        data: { deletedProject },
      } = await api.delete(`/project/${projectId}`);

      setProjects((prev) => prev.filter((p) => p._id !== projectId));

      toast.success(`Project ${deletedProject.name} deleted`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  return (
    <ProjectContext.Provider value={{ projects, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
