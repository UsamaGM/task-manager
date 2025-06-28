import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { LoaderFunctionArgs } from "react-router-dom";

export async function dataLoader() {
  try {
    const response = await api.get("/user/data");

    return response.data;
  } catch (error) {
    apiErrorHandler(error);
  }
}

export async function teamDataLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await api.get("/team/" + params.id);

    return response.data;
  } catch (error) {
    apiErrorHandler(error);
  }
}
