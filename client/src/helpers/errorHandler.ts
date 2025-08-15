import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Error } from "type";

export function formErrorsHandler(errors: Error) {
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
      if (error.code === "ERR_NETWORK")
        errorMessage = "Check your internet connection please!";
      else if (error.status === 401) {
        errorMessage = "You are unauthorized for this request";
      } else if (error.status === 500) {
        errorMessage = "Server Error! Try again later!";
      } else {
        errorMessage =
          error.response.data.message || "Error with server request";
      }
    }
  }
  toast.error(errorMessage || error.message);
}
