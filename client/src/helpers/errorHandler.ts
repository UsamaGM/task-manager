import { ErrorType } from "@/config/type";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function formErrorsHandler(errors: ErrorType) {
  const errorEntries = Object.entries(errors);
  if (errorEntries.length) {
    errorEntries.forEach(([_, error]) => {
      if (error && error.message) {
        toast.error(error.message);
      }
    });
  }
  return errorEntries.length;
}

export function apiErrorHandler(error: any) {
  let errorMessage;
  if (error instanceof AxiosError) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      errorMessage = error.response.data.message || "Error with server request";
    }
  }
  toast.error(errorMessage || error.message);
}
