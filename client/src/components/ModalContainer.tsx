import { ReactNode } from "react";

interface PropTypes {
  title: string;
  children: ReactNode;
}

function ModalContainer({ children, title }: PropTypes) {
  return (
    <div className="absolute inset-0 bg-black/25 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="base-container flex flex-col space-y-2 max-w-xl max-h-4/5 grow rounded-xl bg-white text-gray-800 border border-gray-500 shadow p-5">
        <h3 className="text-center text-xl font-bold">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
