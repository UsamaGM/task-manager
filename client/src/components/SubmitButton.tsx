import Loader from "./Loader";

interface PropTypes {
  isLoading: boolean;
  title: string;
}

function SubmitButton({ isLoading, title }: PropTypes) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {isLoading ? <Loader size="medium" /> : title}
    </button>
  );
}

export default SubmitButton;
