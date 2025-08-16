import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { animate } from "animejs";
import { useRef } from "react";
import { ActionItemProps } from "type";

function ActionItem({ icon, title, subtitle, onClick }: ActionItemProps) {
  const iconRef = useRef<SVGSVGElement>(null);
  function onMouseEnter() {
    animate(iconRef.current!, {
      translateX: "-2.5rem",
      duration: 500,
    });
  }
  function onMouseLeave() {
    animate(iconRef.current!, {
      translateX: 0,
      duration: 500,
    });
  }

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="action-item translate-y-6 opacity-0 flex items-center space-x-3 min-w-[30%] max-w-md shadow border border-gray-300 rounded-2xl bg-white px-2 py-2 w-full overflow-hidden cursor-pointer"
    >
      <div className="flex bg-blue-200 rounded-lg p-2 min-w-10 h-10 text-blue-700">
        {icon}
      </div>
      <div className="flex flex-col items-start w-full text-start">
        <h2 className="text-gray-800 line-clamp-1">{title}</h2>
        <h4 className="text-gray-700 text-sm">{subtitle}</h4>
      </div>
      <ChevronRightIcon
        ref={iconRef}
        className="absolute right-0 z-50 size-6 stroke-2 text-blue-800 translate-x-8"
      />
    </button>
  );
}

export default ActionItem;
