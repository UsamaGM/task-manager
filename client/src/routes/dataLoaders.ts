import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";

export async function dataLoader() {
  try {
    const taskResponse = await api.get("/task");
    const projectsResponse = await api.get("/project");
    const teamsResponse = await api.get("/team");

    return {
      tasks: taskResponse.data,
      projects: projectsResponse.data,
      teams: teamsResponse.data,
    };
  } catch (error) {
    apiErrorHandler(error);
  }
}
