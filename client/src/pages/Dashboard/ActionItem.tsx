import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { animate } from "animejs";

interface PropTypes {
  index: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

function ActionItem({ index, icon, title, subtitle, onClick }: PropTypes) {
  function onMouseEnter() {
    animate(`.go-to-icon-${index}`, {
      translateX: [0, "-2rem"],
      duration: 500,
    });
  }
  function onMouseLeave() {
    animate(`.go-to-icon-${index}`, {
      translateX: ["-2rem", 0],
      duration: 500,
    });
  }

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="flex items-center space-x-3 shadow border border-gray-300 rounded-2xl bg-white hover: backdrop-blur-lg px-4 py-2 w-full overflow-hidden cursor-pointer"
    >
      <div className="flex items-center justify-center bg-blue-200 rounded-lg p-2 min-w-10 h-10 text-blue-700">
        {icon}
      </div>
      <div className="flex flex-col items-start w-full">
        <h2 className="text-gray-800">{title}</h2>
        <h4 className="text-gray-700 text-sm">{subtitle}</h4>
      </div>
      <ArrowRightIcon className={`go-to-icon-${index} size-6 translate-x-8`} />
    </button>
  );
}

export default ActionItem;
