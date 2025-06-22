import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";

export async function myTeamsDataLoader() {
  try {
    const response = await api.get("/team");
    return response.data;
  } catch (error) {
    apiErrorHandler(error);
  }
}

export async function myProjectsDataLoader() {
  try {
    const response = await api.get("/project");
    return response.data;
  } catch (error) {
    apiErrorHandler(error);
  }
}

export async function myTasksDataLoader() {
  try {
    const response = await api.get("/task");
    return response.data;
  } catch (error) {
    apiErrorHandler(error);
  }
}

export async function newTaskDataLoader() {
  try {
    const response = await api.get("/project");
    return response.data;
  } catch (error) {
    apiErrorHandler(error);
  }
}
