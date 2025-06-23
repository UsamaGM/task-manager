interface PropTypes {
  label: string;
  id: string;
  hint: string;
}

function DateSelectorWithLabel({ label, id, hint, ...rest }: PropTypes) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="date"
        title={hint}
        className="w-full px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
        {...rest}
      />
    </div>
  );
}

export default DateSelectorWithLabel;
