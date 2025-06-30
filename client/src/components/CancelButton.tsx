function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-red-700 text-red-700 hover:border-transparent hover:bg-red-700 hover:text-white font-bold px-3 py-2 rounded-lg hover:shadow transition-colors duration-300 cursor-pointer"
    >
      Cancel
    </button>
  );
}

export default CancelButton;
