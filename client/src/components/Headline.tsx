import { PlusIcon } from "@heroicons/react/24/outline";
import { animate, stagger } from "animejs";
import { useEffect } from "react";

interface PropTypes {
  title: string;
  rightButtonTitle: string;
  rightButtonAction: () => void;
}

function Headline({ title, rightButtonTitle, rightButtonAction }: PropTypes) {
  useEffect(() => {
    animate(".div > *", {
      translateX: [-50, 0],
      opacity: 1,
      duration: 300,
      delay: stagger(200),
    });
  }, []);

  return (
    <div className="div flex justify-between items-center">
      <h2 className="opacity-0 text-2xl font-bold text-gray-800">{title}</h2>
      <button
        onClick={rightButtonAction}
        className="opacity-0 flex items-center space-x-1 p-3 border border-blue-400 text-gray-800 shadow-md hover:bg-blue-600 hover:text-gray-100 hover:border-transparent rounded-lg transition-colors duration-500 cursor-pointer"
      >
        <PlusIcon className="size-5 stroke-2" />
        <span className="text-sm font-semibold">{rightButtonTitle}</span>
      </button>
    </div>
  );
}

export default Headline;
