import { animate } from "animejs";
import { ReactNode, useEffect } from "react";

function Card({ children }: { children: ReactNode }) {
  useEffect(() => {
    const rootAnimation = animate(".base", {
      opacity: [0, 1],
      duration: 1000,
      ease: "inOutExpo",
    });
    const contentAnimation = animate(".content > *", {
      translateY: ["-100px", "0%"],
      duration: 1000,
      ease: "inOutExpo",
    });

    return () => {
      rootAnimation.pause();
      contentAnimation.pause();
    };
  }, []);

  return (
    <div className="base opacity-0 relative rounded-3xl bg-[#FEFFFF] shadow-xs overflow-hidden flex-1">
      <div className="absolute left-20 top-24 bg-[#FA6E5E] w-1/2 h-1/3" />
      <div className="absolute left-1/2 top-30 bg-[#9387F0] w-1/2 h-1/3" />
      <div className="content w-full h-full bg-transparent backdrop-blur-3xl flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}

export default Card;
