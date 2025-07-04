import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { LoaderFunctionArgs } from "react-router-dom";

export async function dataLoader() {
  try {
    const response = await api.get("/user/data");

    return response.data;
  } catch (error) {
    // BUG: This function should return a value in the catch block.
    apiErrorHandler(error);
  }
}

export async function userDataLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await api.get("/user/" + params.id);

    return response.data;
  } catch (error) {
    // BUG: This function should return a value in the catch block.
    apiErrorHandler(error);
  }
}

export async function teamDataLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await api.get("/team/" + params.id);

    return response.data;
  } catch (error) {
    // BUG: This function should return a value in the catch block.
    apiErrorHandler(error);
  }
}

export async function projectDataLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await api.get("/project/" + params.id);

    return response.data;
  } catch (error) {
    // BUG: This function should return a value in the catch block.
    apiErrorHandler(error);
  }
}