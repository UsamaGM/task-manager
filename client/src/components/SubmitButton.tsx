function SubmitButton({ title }: { title: string }) {
  return (
    <button
      type="submit"
      className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {title}
    </button>
  );
}

export default SubmitButton;
