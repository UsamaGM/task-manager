import { FieldError, Message } from "react-hook-form";
import { toast } from "react-toastify";

type ErrorType =
  | FieldError
  | (Record<
      string,
      Partial<{
        type: string | number;
        message: Message;
      }>
    > &
      Partial<{
        type: string | number;
        message: Message;
      }>);

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
