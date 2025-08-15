import { forwardRef, useEffect, useState } from "react";
import { TaskPriority } from "type";

interface PrioritySliderProps {
  label: string;
  value?: TaskPriority;
  onChange?: (event: { target: { value: string; name?: string } }) => void;
  onBlur?: (event: { target: { value: string; name?: string } }) => void;
  name?: string;
}

const PrioritySelectorWithLabel = forwardRef<
  HTMLInputElement,
  PrioritySliderProps
>(
  (
    { label, value = "medium" as TaskPriority, onChange, onBlur, name },
    ref,
  ) => {
    const priorities: TaskPriority[] = ["low", "medium", "high"];
    const [selectedPriority, setSelectedPriority] =
      useState<TaskPriority>(value);

    useEffect(() => {
      setSelectedPriority(value);
    }, [value]);

    const handlePriorityChange = (priority: TaskPriority) => {
      setSelectedPriority(priority);
      onChange?.({
        target: {
          value: priority,
          name: name,
        },
      });
    };

    return (
      <div className="flex flex-col flex-1 gap-2">
        <label className="text-sm font-semibold">{label}</label>
        <div className="w-full">
          <input
            ref={ref}
            type="hidden"
            name={name}
            value={selectedPriority}
            onBlur={() =>
              onBlur?.({
                target: {
                  value: selectedPriority,
                  name: name,
                },
              })
            }
          />
          <div className="relative h-10 bg-white outline rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-300 ease-in-out flex">
            {priorities.map((priority, index) => (
              <button
                key={priority}
                type="button"
                onClick={() => handlePriorityChange(priority)}
                className={`flex-1 h-full transition-all duration-300 ease-in-out focus:outline-none relative ${
                  selectedPriority === priority
                    ? priority === "low"
                      ? "bg-green-300 text-green-800"
                      : priority === "medium"
                        ? "bg-yellow-300 text-yellow-800"
                        : "bg-red-300 text-red-800"
                    : "bg-transparent text-gray-500 hover:bg-gray-50 cursor-pointer"
                } ${index > 0 ? "border-l border-gray-300" : ""}`}
              >
                <span className="text-sm capitalize">
                  {selectedPriority === priority ? selectedPriority : priority}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

PrioritySelectorWithLabel.displayName = "PrioritySlider";

export default PrioritySelectorWithLabel;
