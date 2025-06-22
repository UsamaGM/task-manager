import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface PropTypes {
  title: string;
  rightLinkTitle: string;
  rightLinkTo: string;
}

function Headline({ title, rightLinkTitle, rightLinkTo }: PropTypes) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <Link
        to={rightLinkTo}
        className="flex items-center space-x-1 p-3 shadow bg-blue-500 text-white hover:bg-blue-400 rounded-lg cursor-pointer transition-colors duration-500"
      >
        <PlusIcon className="size-5 stroke-2" />
        <span className="text-sm font-semibold">{rightLinkTitle}</span>
      </Link>
    </div>
  );
}

export default Headline;
