import api from "@/config/api";
import { deleteCookie, getCookie, setCookie } from "@/config/cookie";
import { apiErrorHandler } from "@/helpers/errorHandler";
import { toast } from "react-toastify";
import { User } from "type";
import { create } from "zustand";

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  init: () => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  loading: true,
  isAuthenticated: false,
  user: null,
  init: async () => {
    const token = getCookie("token");
    if (token) {
      try {
        await api.get("/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const localUserJSON = localStorage.getItem("user");
        if (!localUserJSON) {
          set({ isAuthenticated: false });
          return;
        }

        const localUser = JSON.parse(localUserJSON);
        set({ user: localUser, isAuthenticated: true });

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error(error);
        toast.error("Session expired, please log in again");
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      } finally {
        set({ loading: false });
      }
    } else {
      set({ loading: false });
    }
  },
  register: async (data) => {
    set({ loading: true });

    try {
      const response = await api.post("/auth/register", data);
      set({ loading: false });
      if (response.status === 201) return true;
      else return false;
    } catch (error) {
      apiErrorHandler(error);
      set({ loading: false });
      return false;
    }
  },
  login: async (data) => {
    set({ loading: true });
    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setCookie("token", response.data.token, {
          maxAge: 259200,
          path: "/",
        });

        api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

        set({
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        });
        return true;
      }
    } catch (error) {
      apiErrorHandler(error);
      set({ loading: false });
      return false;
    }

    return true;
  },
  logout: async () => {
    localStorage.removeItem("user");
    deleteCookie("token");
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  },
}));

export default useAuthStore;
