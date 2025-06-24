import { animate, stagger } from "animejs";
import { useEffect } from "react";

interface PropTypes {
  fullscreen?: boolean;
  size?: "small" | "medium" | "large";
}

function Loader({ fullscreen = false, size = "medium" }: PropTypes) {
  //TODO: Improve with modern design

  let dotSize;
  switch (size) {
    case "small":
      dotSize = 2;
      break;
    case "medium":
      dotSize = 3;
      break;
    case "large":
      dotSize = 4;
      break;
    default:
      dotSize = 3;
  }

  useEffect(() => {
    animate(".loader-dot", {
      translateY: [0, -30, 30, 0],
      duration: 800,
      delay: stagger(100),
      loop: true,
      loopDelay: 100,
    });
  });

  const loader = (
    <div className="flex justify-center items-center space-x-3 w-full h-full">
      <div
        className={`loader-dot bg-red-500 rounded-full ${"size-" + dotSize}`}
      />
      <div
        className={`loader-dot bg-yellow-500 rounded-full ${"size-" + dotSize}`}
      />
      <div
        className={`loader-dot bg-green-500 rounded-full ${"size-" + dotSize}`}
      />
      <div
        className={`loader-dot bg-blue-500 rounded-full ${"size-" + dotSize}`}
      />
    </div>
  );

  return fullscreen ? (
    <div className="w-screen h-screen">{loader}</div>
  ) : (
    loader
  );
}

export default Loader;
