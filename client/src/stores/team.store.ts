import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { toast } from "react-toastify";
import { Team } from "type";
import { create } from "zustand";

interface TeamStore {
  loading: boolean;
  teams: Team[];
  findTeamWithProject: (projectId: string) => Team | undefined;
  createTeam: (name: string, description: string) => Promise<void>;
  updateTeamData: (teamId: string, updatedData: any) => Promise<void>;
  assignProject: (projectId: string, teamId: string) => Promise<void>;
  addMember: (teamId: string, members: string[]) => Promise<void>;
  removeMember: (teamId: string, members: string[]) => Promise<void>;
  leaveTeam: (teamId: string) => Promise<void>;
  deleteTeam: (teamId: string) => Promise<void>;
}

const useTeamStore = create<TeamStore>((set, get) => ({
  loading: true,
  teams: [],

  findTeamWithProject: (projectId) =>
    get().teams.find((team) =>
      team.projects.some((project) => project === projectId),
    ),

  createTeam: async (name, description) => {
    set({ loading: true });

    try {
      const { data }: { data: Team } = await api.post("/team", {
        name,
        description,
      });

      set({ teams: [data, ...get().teams] });

      toast.success(`Created team: "${data.name}"`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  updateTeamData: async (teamId, updatedData) => {
    const originalTeams = get().teams;
    const originalTeam = originalTeams.find((t) => t._id === teamId);
    if (!originalTeam) return;

    set({
      teams: originalTeams.map((t) =>
        t._id === teamId ? { ...t, ...updatedData } : t,
      ),
    });

    try {
      await api.put("/team", {
        teamId,
        updatedData,
      });

      toast.success("Team Data Updated");
    } catch (error) {
      set({
        teams: get().teams.map((t) => (t._id === teamId ? originalTeam : t)),
      });
      apiErrorHandler(error);
    }
  },

  assignProject: async (projectId, teamId) => {
    const originalTeams = get().teams;
    const originalTeam = originalTeams.find((t) => t._id === teamId);
    if (!originalTeam) return;

    set({
      teams: originalTeams.map((t) =>
        t._id === teamId ? { ...t, projects: [...t.projects, projectId] } : t,
      ),
    });

    try {
      await api.put("/team/assign", {
        projectId,
        teamId,
      });

      toast.success(`Team ${originalTeam.name} was assigned the project`);
    } catch (error) {
      set({
        teams: get().teams.map((t) => (t._id === teamId ? originalTeam : t)),
      });
      apiErrorHandler(error);
    }
  },

  addMember: async (teamId, members) => {
    set({ loading: true });

    try {
      const { data }: { data: Team } = await api.put("/team/add-member", {
        teamId,
        members,
      });

      const teams = get().teams.map((team) =>
        team._id === teamId ? data : team,
      );
      set({ teams });

      toast.success(`New members added to team ${data.name}`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  removeMember: async (teamId: string, members: string[]) => {
    const originalTeam = get().teams.find((t) => t._id === teamId);
    if (!originalTeam) return;

    const updatedTeams = get().teams.map((t) =>
      t._id === teamId
        ? { ...t, members: t.members.filter((m) => !members.includes(m._id)) }
        : t,
    );
    set({ teams: updatedTeams });

    try {
      await api.put("/team/remove-member", {
        teamId,
        members,
      });

      toast.success(`Members removed from team ${originalTeam.name}`);
    } catch (error) {
      set({
        teams: get().teams.map((t) => (t._id === teamId ? originalTeam : t)),
      });
      apiErrorHandler(error);
    }
  },

  leaveTeam: async (teamId: string) => {
    const originalTeams = get().teams;
    const originalTeam = originalTeams.find((t) => t._id === teamId);
    if (!originalTeam) return;

    set({ teams: originalTeams.filter((t) => t._id !== teamId) });

    try {
      await api.put(`/team/leave/${teamId}`);

      toast.success(`You left team ${originalTeam.name}`);
    } catch (error) {
      set({ teams: [originalTeam, ...get().teams] });
      apiErrorHandler(error);
    }
  },

  deleteTeam: async (teamId: string) => {
    const originalTeams = get().teams;
    const originalTeam = originalTeams.find((t) => t._id === teamId);
    if (!originalTeam) return;

    set({ teams: originalTeams.filter((t) => t._id !== teamId) });

    try {
      await api.delete(`/team/${teamId}`);

      toast.success(`Team ${originalTeam.name} was deleted`);
    } catch (error) {
      set({ teams: [originalTeam, ...get().teams] });
      apiErrorHandler(error);
    }
  },
}));

export default useTeamStore;
