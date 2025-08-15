import useProjectStore from "@/stores/project.store";
import TitledSegment from "./TitledSegment";
import ProjectActionItem from "./ProjectActionItem";

export default function Projects() {
  const projectsLoading = useProjectStore((s) => s.loading);
  const projects = useProjectStore((s) => s.projects);

  return (
    <TitledSegment title="Projects" showLoading={projectsLoading}>
      <div className="projects-container flex w-full space-x-3 overflow-x-auto pb-2">
        {projects.map((project, index) => (
          <ProjectActionItem project={project} index={index} />
        ))}
      </div>
    </TitledSegment>
  );
}
