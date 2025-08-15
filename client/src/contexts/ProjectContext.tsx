import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Project } from "type";

interface ProjectContextType {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  getProjectsArray: (projectIds: string[]) => Project[];
  getProjectsTaskCount: (projectIds: string[]) => number;
  getProjectWithTask: (taskId: string) => Project;
  createProject: (data: Project) => Promise<void>;
  updateProject: (projectId: string, updateData: any) => Promise<void>;
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
  const { projects: userProjects }: { projects: Project[] } = useLoaderData();

  const [projects, setProjects] = useState(userProjects);

  function getProjectsArray(projectIds: string[]) {
    return projects.filter((project) => projectIds.includes(project._id));
  }

  function getProjectsTaskCount(projectIds: string[]) {
    return projects.reduce(
      (acc, project) =>
        projectIds.some((id) => id === project._id)
          ? project.tasks.length + acc
          : acc,
      0,
    );
  }

  function getProjectWithTask(taskId: string) {
    return projects.find((project) =>
      project.tasks.some((task) => task === taskId),
    )!;
  }

  async function createProject(project: Project) {
    try {
      const { data }: { data: Project } = await api.post("/project", project);

      setProjects((prev) => [data, ...prev]);
      toast.success(`Created the project "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function updateProject(projectId: string, updatedData: any) {
    try {
      const { data }: { data: Project } = await api.put("/project", {
        id: projectId,
        data: updatedData,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === data._id ? { ...p, ...data } : p)),
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
        setProjects,
        getProjectsArray,
        getProjectsTaskCount,
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
