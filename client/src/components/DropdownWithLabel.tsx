import { ProjectType, TaskPriorityType } from "@/helpers/types";
import { getFormattedDate } from "@/helpers/date-formatter";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { animate } from "animejs";
import { forwardRef, useEffect, useState } from "react";

interface DropdownPropTypes {
  label: string;
  placeholder: string;
  options: Array<ProjectType>;
  value?: string;
  onChange?: (event: { target: { value: string; name?: string } }) => void;
  onBlur?: (event: { target: { value: string; name?: string } }) => void;
  name?: string;
}

const DropdownWithLabel = forwardRef<HTMLInputElement, DropdownPropTypes>(
  ({ label, placeholder, options, value, onChange, onBlur, name }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ProjectType | null>(
      null
    );

    useEffect(() => {
      if (value) {
        const option = options.find((opt) => opt._id === value);
        setSelectedOption(option || null);
      } else {
        setSelectedOption(null);
      }
    }, [value, options]);

    const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
      animate(".icon", {
        rotateZ: isOpen ? [0, 180] : [180, 360],
        duration: 300,
      });
    };

    const handleOptionSelect = (option: ProjectType) => {
      setSelectedOption(option);
      setIsOpen(false);

      onChange?.({
        target: {
          value: option._id,
          name: name,
        },
      });

      animate(".icon", {
        rotateZ: [180, 360],
        duration: 300,
      });
    };

    useEffect(() => {
      function clickOutside() {
        setIsOpen(false);

        animate(".icon", {
          rotateZ: [180, 360],
          duration: 300,
        });
      }

      if (isOpen) {
        document.addEventListener("click", clickOutside);
      }

      return () => document.removeEventListener("click", clickOutside);
    }, [isOpen]);

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">{label}</label>
        <div className="relative w-full">
          <input
            ref={ref}
            type="hidden"
            name={name}
            value={value || ""}
            onBlur={onBlur}
          />

          <button
            type="button"
            onClick={toggleDropdown}
            onBlur={(e) => {
              onBlur?.({
                target: {
                  value: value || "",
                  name: name,
                },
              });
            }}
            className="w-full px-4 py-2 outline rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
          >
            {selectedOption ? selectedOption.name : placeholder}
            <ChevronDownIcon className="size-5 icon" />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="none">
                {options.map((option) => (
                  <button
                    key={option._id}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left rounded-lg px-4 py-2 text-sm transition-colors duration-150 ${
                      selectedOption?._id === option._id
                        ? "bg-blue-100 text-blue-900"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                    role="menuitem"
                  >
                    {`${option.name} (Starts: ${getFormattedDate(
                      option.startDate
                    )}, Ends: ${getFormattedDate(option.endDate)})`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

DropdownWithLabel.displayName = "Dropdown";

export default DropdownWithLabel;
