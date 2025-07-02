import Loader from "./Loader";

interface PropTypes {
  isLoading: boolean;
  onClick?: (e?: any) => void;
  title: string;
}

function SubmitButton({ isLoading, title, onClick }: PropTypes) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer"
    >
      {isLoading ? <Loader size="small" /> : title}
    </button>
  );
}

export default SubmitButton;
