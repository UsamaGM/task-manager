function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full hover:bg-red-200 hover:text-red-800 px-3 py-2 rounded-lg hover:shadow transition-colors duration-300 cursor-pointer"
    >
      Cancel
    </button>
  );
}

export default CancelButton;
