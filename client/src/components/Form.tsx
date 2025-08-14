import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import { SubmitButton } from "@/components";
import { formErrorsHandler } from "@/helpers/errorHandler";

interface FormProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: Partial<Record<keyof T, any>>;
  isSubmitting?: boolean;
  isLoading?: boolean;
  submitButtonText?: string;
  className?: string;
  title?: string;
  showSubmitButton?: boolean;
}

function Form<T extends FieldValues>({
  children,
  onSubmit,
  errors,
  isSubmitting = false,
  isLoading = false,
  submitButtonText = "Submit",
  className = "",
  title,
  showSubmitButton = true,
}: FormProps<T>) {
  const isError = !!formErrorsHandler(errors);

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col space-y-6 ${
        isError && "border-red-400 border-2"
      } ${className}`}
    >
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">
          {title}
        </h2>
      )}

      <div className="flex flex-col space-y-4">
        {children}
      </div>

      {showSubmitButton && (
        <SubmitButton
          title={submitButtonText}
          isLoading={isSubmitting || isLoading}
        />
      )}
    </form>
  );
}

export default Form;