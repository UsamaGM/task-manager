import { animate, utils } from "animejs";
import { ReactNode, useEffect } from "react";

function Card({
  children,
  animated = true,
}: {
  children: ReactNode;
  animated?: boolean;
}) {
  useEffect(() => {
    if (animated)
      animate(".box", {
        left: () => utils.random(0, 100) + "%",
        top: () => utils.random(0, 100) + "%",
        ease: "inOutSine",
        duration: 3000,
        frameRate: 15,
        loop: true,
        onLoop: (a) => a.refresh(),
      });
  }, []);

  return (
    <div className="base relative rounded-3xl bg-white shadow-xs overflow-hidden flex-1">
      <div className="box absolute bg-[#FA6E5E] size-56 rounded-full" />
      <div className="box absolute bg-[#5f3732] size-56 rounded-full" />
      <div className="box absolute bg-[#1bc282] size-56 rounded-full" />
      <div className="box absolute bg-[#1a1dbe] size-56 rounded-full" />
      <div className="box absolute bg-[#8b143c] size-56 rounded-full" />
      <div className="w-full h-full bg-transparent backdrop-blur-3xl flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}

export default Card;
