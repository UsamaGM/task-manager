import api from "@/config/api";
import { deleteCookie, getCookie, setCookie } from "@/config/cookie";
import { UserType } from "@/helpers/types";
import { apiErrorHandler } from "@/helpers/errorHandler";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  user: UserType | null;
  login: (data: any) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const logout = useCallback(function () {
    localStorage.removeItem("user");
    deleteCookie("token");
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    async function checkAuthorization() {
      const token = getCookie("token");
      if (token) {
        try {
          await api.get("/auth/verify");

          const localUserJSON = localStorage.getItem("user");
          if (!localUserJSON) {
            setIsAuthenticated(false);
            return;
          }
          const localUser = JSON.parse(localUserJSON);
          setUser(localUser);
          setIsAuthenticated(true);
        } catch (error) {
          toast.error("Session expired, please log in again");
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    checkAuthorization();
  }, [logout]);

  const login = useCallback(
    async function (data: any) {
      try {
        const response = await api.post("/auth/login", data);

        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.user));

          setCookie("token", response.data.token, {
            maxAge: 259200,
            path: "/",
          });

          api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

          setIsAuthenticated(true);

          setUser(response.data.user);

          return true;
        }
      } catch (error) {
        apiErrorHandler(error);
        return false;
      }
      return true;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
