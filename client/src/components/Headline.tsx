import { PlusIcon } from "@heroicons/react/24/solid";

interface PropTypes {
  title: string;
  rightButtonTitle: string;
  rightButtonAction: () => void;
}

function Headline({ title, rightButtonTitle, rightButtonAction }: PropTypes) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <button
        onClick={rightButtonAction}
        className="flex items-center space-x-1 p-3 shadow bg-blue-500 text-white hover:bg-blue-400 rounded-lg transition-colors duration-500 cursor-pointer"
      >
        <PlusIcon className="size-5 stroke-2" />
        <span className="text-sm font-semibold">{rightButtonTitle}</span>
      </button>
    </div>
  );
}

export default Headline;
