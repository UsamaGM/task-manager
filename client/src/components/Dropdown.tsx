import { ProjectType } from "@/config/type";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { animate } from "animejs";
import { useEffect, useState } from "react";

interface DropdownPropTypes {
  placeholder: string;
  options: Array<ProjectType>;
}

function Dropdown({ placeholder, options }: DropdownPropTypes) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    animate(".icon", {
      rotateZ: isOpen ? [0, 180] : [180, 360],
      duration: 300,
    });
  };

  useEffect(() => {
    function clickOutside() {
      setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("click", clickOutside);
    }
    return () => document.removeEventListener("click", clickOutside);
  }, [isOpen]);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-2 outline rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
      >
        {placeholder}
        <ChevronDownIcon className="size-5 icon" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option._id}
                type="button"
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                role="menuitem"
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
