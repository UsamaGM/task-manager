import { animate, stagger } from "animejs";
import { createElement, ReactElement, useEffect } from "react";

interface PropTypes {
  icon: ReactElement;
  message: string;
}

function NoXMessage({ icon, message }: PropTypes) {
  useEffect(() => {
    animate(".message > *", {
      translateY: [-50, 0],
      opacity: 1,
      duration: 300,
      ease: "inCirc",
      delay: stagger(200),
    });
  }, []);

  return (
    <div className="message flex flex-col justify-center items-center space-y-8 w-full h-full text-gray-800 font-bold">
      {createElement(icon.type, {
        className: "size-20 opacity-0 text-red-500",
      })}
      <h2 className="text-center opacity-0">{message}</h2>
    </div>
  );
}

export default NoXMessage;
