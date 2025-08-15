import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import useProjectStore from "@/stores/project.store";
import useTaskStore from "@/stores/task.store";
import useTeamStore from "@/stores/team.store";
import { LoaderFunctionArgs } from "react-router-dom";

export async function dataLoader() {
  try {
    const { data } = await api.get("/user/data");

    useTeamStore.setState({ teams: data.teams, loading: false });
    useProjectStore.setState({ projects: data.projects, loading: false });
    useTaskStore.setState({ tasks: data.tasks, loading: false });

    return data;
  } catch (error) {
    apiErrorHandler(error);
    return null;
  }
}

export async function userDataLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await api.get("/user/" + params.id);

    return response.data;
  } catch (error) {
    apiErrorHandler(error);
    return null;
  }
}

export async function teamDataLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await api.get("/team/" + params.id);

    return response.data;
  } catch (error) {
    apiErrorHandler(error);
    return null;
  }
}

export async function projectDataLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await api.get("/project/" + params.id);

    return response.data;
  } catch (error) {
    apiErrorHandler(error);
    return null;
  }
}
