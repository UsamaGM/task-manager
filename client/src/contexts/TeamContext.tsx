import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { TeamType } from "@/helpers/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

interface TeamContextType {
  teams: TeamType[];
  createTeam: (name: string, description: string) => Promise<void>;
  updateTeamData: (teamId: string, updatedData: any) => Promise<void>;
  addMember: (
    teamId: string,
    members: { user: string; role: string }[]
  ) => Promise<void>;
  removeMember: (teamId: string, userId: string) => Promise<void>;
  deleteTeam: (teamId: string) => Promise<void>;
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
        prev.map((team) => (team._id === teamId ? { ...team, ...data } : team))
      );

      toast.success("Team Data Updated");
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function addMember(
    teamId: string,
    members: { user: string; role: string }[]
  ) {
    try {
      const { data }: { data: TeamType } = await api.put("/team/add-member", {
        teamId,
        members,
      });
      setTeams((prev) =>
        prev.map((team) => (team._id === data._id ? data : team))
      );
    } catch (error) {
      apiErrorHandler(error);
    }
  }

  async function removeMember(teamId: string, userId: string) {}

  async function deleteTeam(teamId: string) {}

  return (
    <TeamContext.Provider
      value={{
        teams,
        createTeam,
        updateTeamData,
        addMember,
        removeMember,
        deleteTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export default TeamProvider;
