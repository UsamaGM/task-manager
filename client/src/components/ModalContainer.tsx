import { ModalContainerProps } from "type";

function ModalContainer({ children, title, onClose }: ModalContainerProps) {
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="absolute inset-0 bg-black/25 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-auto"
      onClick={handleBackdropClick}
    >
      <div
        className="base-container flex flex-col space-y-2 max-w-2xl max-h-[85%] overflow-auto grow rounded-2xl bg-white text-gray-800 shadow p-8"
        onClick={handleContentClick}
      >
        <h3 className="text-center text-xl font-bold">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
