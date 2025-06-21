import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { animate, stagger } from "animejs";
import { ReactNode, useEffect } from "react";

interface PropTypes {
  title: string;
  count: number;
  children: ReactNode;
}

function TaskListContainer({ title, count, children }: PropTypes) {
  useEffect(() => {
    animate(".task-list-item", {
      translateX: "8rem",
      duration: 400,
      delay: stagger(100),
    });
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4">
      <h3 className="font-bold">
        {title} ({count})
      </h3>
      <div className="flex flex-col flex-1 min-h-0 space-y-4 mt-8 -mr-2 pr-2 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default TaskListContainer;
