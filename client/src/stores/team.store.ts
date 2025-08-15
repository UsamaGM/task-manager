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
  leaveTeam: (teamId: string) => Promise<boolean>;
  deleteTeam: (teamId: string) => Promise<boolean>;
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
    set({ loading: true });
    try {
      const { data }: { data: Team } = await api.put("/team", {
        teamId,
        updatedData,
      });

      const teams = get().teams.map((team) =>
        team._id === teamId ? data : team,
      );
      set({ teams });

      toast.success("Team Data Updated");
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  assignProject: async (projectId, teamId) => {
    set({ loading: true });
    try {
      const { data }: { data: Team } = await api.put("/team/assign", {
        projectId,
        teamId,
      });

      const teams = get().teams.map((team) =>
        team._id === data._id ? data : team,
      );
      set({ teams });

      toast.success(`Team ${data.name} was assigned the project`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
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
    set({ loading: true });
    try {
      const { data }: { data: Team } = await api.put("/team/remove-member", {
        teamId,
        members,
      });

      const teams = get().teams.map((team) =>
        team._id === teamId ? data : team,
      );
      set({ teams });

      toast.success(`Members removed from team ${data.name}`);
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      set({ loading: false });
    }
  },

  leaveTeam: async (teamId: string) => {
    set({ loading: true });
    try {
      await api.put(`/team/leave/${teamId}`);

      const teams = get().teams.filter((t) => t._id !== teamId);
      set({ teams });

      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteTeam: async (teamId: string) => {
    set({ loading: true });
    try {
      await api.delete(`/team/${teamId}`);

      const teams = get().teams.filter((team) => team._id !== teamId);
      set({ teams });

      return true;
    } catch (error) {
      apiErrorHandler(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTeamStore;
