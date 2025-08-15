import Headline from "@/components/Headline";
import { useProjectModals } from "@/hooks";
import Projects from "./Projects";

function MyProjects() {
  const {
    ModalComponents,
    createProject,
    editProject,
    assignTeamToProject,
    deleteProject,
  } = useProjectModals();

  return (
    <div className="relative flex flex-col space-y-6 h-[calc(100vh-1rem)] p-6">
      <Headline
        title="My Projects"
        rightButtonTitle="Create Project"
        rightButtonAction={createProject}
      />

      <Projects
        fns={{
          editProject,
          assignTeamToProject,
          deleteProject,
        }}
      />

      <ModalComponents />
    </div>
  );
}

export default MyProjects;
