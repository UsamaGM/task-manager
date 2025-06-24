interface PropTypes {
  label: string;
  id: string;
  placeholder: string;
  hint: string;
}

function TextInputWithLabel({
  label,
  id,
  placeholder,
  hint,
  ...rest
}: PropTypes) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        title={hint}
        className="w-full px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
        {...rest}
      />
    </div>
  );
}

export default TextInputWithLabel;
