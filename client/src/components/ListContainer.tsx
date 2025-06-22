import { animate, stagger } from "animejs";
import { ReactNode, useEffect } from "react";

interface PropTypes {
  title: string;
  children: ReactNode;
}

function ListContainer({ title, children }: PropTypes) {
  useEffect(() => {
    animate(".list-container-item", {
      translateX: "8rem",
      duration: 400,
      delay: stagger(100),
    });
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden mt-4">
      <h3 className="font-bold">{title}</h3>
      <div className="flex flex-col flex-1 min-h-0 space-y-4 mt-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default ListContainer;
