import { ReactNode } from "react";

interface PropTypes {
  onSubmit: (e: any) => void;
  isError: boolean;
  title: string;
  children: ReactNode;
}

function FormContainer({ onSubmit, isError, title, children }: PropTypes) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col space-y-4 bg-white p-8 rounded-xl shadow border border-gray-500 w-full max-w-2xl ${
        isError && "border-red-400 border-2"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        {title}
      </h2>
      {children}
    </form>
  );
}

export default FormContainer;
