import * as anime from "animejs";
import { useEffect } from "react";

interface PropTypes {
  index: number;
  stat: number;
  description: string;
}

function StatCard({ index, stat, description }: PropTypes) {
  useEffect(() => {
    const tl = new anime.Timeline({
      duration: 1000,
      delay: anime.stagger(100),
    });

    tl.add(".stat", {
      translateX: [-10, 0],
      opacity: [0, 1],
      duration: 500,
      ease: "inOutSine",
    }).add(
      ".description",
      {
        translateY: [-10, 0],
        opacity: [0, 1],
        duration: 500,
        ease: "inOutSine",
      },
      "-=200"
    );
  });

  function enterAnimation() {
    anime.animate(`.styled-bg-${index}`, {
      opacity: [0, 1],
      translateX: ["-100%", 0],
      translateY: ["-100%", 0],
      duration: 1000,
      ease: "inOutQuad",
      id: `in-${index}`,
    });
  }
  function leaveAnimation() {
    anime.animate(`.styled-bg-${index}`, {
      opacity: [1, 0],
      translateX: [0, "-100%"],
      translateY: [0, "-100%"],
      duration: 500,
      ease: "inOutQuad",
      id: `out-${index}`,
    });
  }

  return (
    <div
      onMouseEnter={enterAnimation}
      onMouseLeave={leaveAnimation}
      className="relative flex flex-col items-start justify-center flex-1 bg-blue-50 rounded-2xl p-8 overflow-hidden z-0"
    >
      <div
        className={`styled-bg-${index} opacity-0 absolute left-0 top-0 w-[200%] h-[200%] bg-gradient-to-br from-[#FA6F5E] via-[#9387F0] to-[#FEFFFF]`}
      />
      <h1 className="stat opacity-0 text-gray-900 text-3xl z-20">{stat}</h1>
      <h4 className="description opacity-0 text-gray-700 z-20">
        {description}
      </h4>
    </div>
  );
}

export default StatCard;
