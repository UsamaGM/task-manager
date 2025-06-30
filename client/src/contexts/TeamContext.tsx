import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { TeamType } from "@/helpers/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

interface TeamContextType {
  teams: TeamType[];
  findTeamWithProject: (projectId: string) => TeamType | undefined;
  createTeam: (name: string, description: string) => Promise<void>;
  updateTeamData: (teamId: string, updatedData: any) => Promise<void>;
  assignProject: (projectId: string, teamId: string) => Promise<void>;
  addMember: (teamId: string, members: string[]) => Promise<void>;
  removeMember: (teamId: string, members: string[]) => Promise<void>;
  leaveTeam: (teamId: string) => Promise<boolean>;
  deleteTeam: (teamId: string) => Promise<boolean>;
}

const TeamContext = createContext<TeamContextType | null>(null);

export function useTeam() {
  const context = useContext(TeamContext);

  if (!context) throw new Error("useTeam can only be used within TeamProvider");

  return context;
}

function TeamProvider({ children }: { children: ReactNode }) {
  const { teams: userTeams }: { teams: TeamType[] } = useLoaderData();
  const [teams, setTeams] = useState(userTeams);

  function findTeamWithProject(projectId: string) {
    return teams.find((team) =>
      team.projects.some((project) => project === projectId)
    );
  }

  async function createTeam(name: string, description: string) {
    try {
      const { data }: { data: TeamType } = await api.post("/team", {
        name,
        description,
      });

      setTeams((prev) => [data, ...prev]);

      toast.success(`Created team: "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function updateTeamData(teamId: string, updatedData: any) {
    try {
      const { data }: { data: TeamType } = await api.put("/team", {
        teamId,
        updatedData,
      });

      setTeams((prev) =>
        prev.map((team) => (team._id === teamId ? data : team))
      );

      toast.success("Team Data Updated");
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function assignProject(projectId: string, teamId: string) {
    try {
      const { data }: { data: TeamType } = await api.put("/team/assign", {
        projectId,
        teamId,
      });
      console.log(data);
      setTeams((prev) =>
        prev.map((team) => (team._id === data._id ? data : team))
      );
      toast.success(`Team ${data.name} was assigned the project`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function addMember(teamId: string, members: string[]) {
    try {
      const { data }: { data: TeamType } = await api.put("/team/add-member", {
        teamId,
        members,
      });
      setTeams((prev) =>
        prev.map((team) => (team._id === teamId ? data : team))
      );
      toast.success(`New members added to team ${data.name}`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function removeMember(teamId: string, members: string[]) {
    try {
      const { data }: { data: TeamType } = await api.put(
        "/team/remove-member",
        {
          teamId,
          members,
        }
      );
      setTeams((prev) =>
        prev.map((team) => (team._id === teamId ? data : team))
      );
      toast.success(`Members removed from team ${data.name}`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function leaveTeam(teamId: string) {
    try {
      await api.put(`/team/leave/${teamId}`);
      setTeams((prev) => prev.filter((t) => t._id !== teamId));
      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    }
  }

  async function deleteTeam(teamId: string) {
    if (!teamId) {
      toast.error("Team ID not provided");
      return false;
    }

    try {
      await api.delete(`/team/${teamId}`);
      setTeams((prev) => prev.filter((team) => team._id !== teamId));
      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    }
  }

  return (
    <TeamContext.Provider
      value={{
        teams,
        findTeamWithProject,
        createTeam,
        updateTeamData,
        assignProject,
        addMember,
        removeMember,
        leaveTeam,
        deleteTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export default TeamProvider;
