import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { TeamType } from "@/helpers/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

interface TeamContextType {
  teams: TeamType[];
  updateTeamData: (teamId: string, updatedData: any) => Promise<void>;
  addMember: (teamId: string, userId: string) => Promise<void>;
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
  const data: TeamType[] = useLoaderData();
  const [teams, setTeams] = useState(data);

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

  async function addMember(teamId: string, userId: string) {}

  async function removeMember(teamId: string, userId: string) {}

  async function deleteTeam(teamId: string) {}

  return (
    <TeamContext.Provider
      value={{
        teams,
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
