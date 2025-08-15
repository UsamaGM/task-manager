import { useEffect } from "react";
import { animate, stagger } from "animejs";
import Stats from "./Stats";
import QuickActions from "./QuickActions";
import Tasks from "./Tasks";
import Projects from "./Projects";
import Teams from "./Teams";

function Dashboard() {
  useEffect(() => {
    const animation = {
      translateY: [0, "-1.5rem"],
      opacity: 1,
      duration: 300,
      delay: stagger(100),
    };

    animate(".actions-container > .action-item", animation);
    animate(".projects-container > .action-item", animation);
    animate(".teams-container > .action-item", animation);
  }, []);

  return (
    <div className="flex flex-col space-y-6 w-full h-[calc(100vh-1rem)] overflow-y-scroll p-6">
      <Stats />
      <QuickActions />
      <Tasks />
      <Projects />
      <Teams />
    </div>
  );
}

export default Dashboard;
