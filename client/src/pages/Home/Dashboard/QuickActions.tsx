import {
  CubeIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import ActionItem from "./ActionItem";
import TitledSegment from "./TitledSegment";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <TitledSegment title="Quick Actions">
      <div className="actions-container flex w-full space-x-3">
        <ActionItem
          icon={<UserGroupIcon />}
          title="Create Team"
          subtitle="Create team and invite members"
          onClick={() => navigate("/home/my-teams")}
        />
        <ActionItem
          icon={<CubeIcon />}
          title="Create Project"
          subtitle="Create a new project"
          onClick={() => navigate("/home/my-projects")}
        />
        <ActionItem
          icon={<DocumentTextIcon />}
          title="Create Task"
          subtitle="Create a new task in a project"
          onClick={() => navigate("/home/my-tasks")}
        />
      </div>
    </TitledSegment>
  );
}
