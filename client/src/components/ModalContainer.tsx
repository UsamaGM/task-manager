import { ReactNode } from "react";

interface PropTypes {
  title: string;
  children: ReactNode;
}

function ModalContainer({ children, title }: PropTypes) {
  return (
    <div className="absolute inset-0 bg-black/25 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="base-container flex flex-col space-y-2 max-w-2xl max-h-[85%] grow rounded-2xl bg-white text-gray-800 shadow p-8">
        <h3 className="text-center text-xl font-bold">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
