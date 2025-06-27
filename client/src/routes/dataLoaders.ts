import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";

export async function dataLoader() {
  try {
    const response = await api.get("/user/data");

    return response.data;
  } catch (error) {
    apiErrorHandler(error);
  }
}
