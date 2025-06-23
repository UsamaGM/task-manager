import api from "@/config/api";
import { apiErrorHandler } from "@/helpers/errorHandler";
import {
  GroupedTasksListType,
  TaskPriorityType,
  TaskStatusType,
  TaskType,
  TaskWithProjectType,
} from "@/helpers/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

interface UpdateDataType {
  name?: string;
  description?: string;
  dueData?: string;
  priority?: TaskPriorityType;
}

interface TaskContextType {
  tasks: GroupedTasksListType;
  changeTaskStatus: (
    taskId: string,
    prevStatus: TaskStatusType,
    newStatus: TaskStatusType
  ) => Promise<void>;
  updateTask: (taskId: string, formData: UpdateDataType) => Promise<void>;
  deleteTask: (task: TaskWithProjectType) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTask must be used within TaskProvider");

  return context;
}

export default function TaskProvider({ children }: { children: ReactNode }) {
  const { tasks: groupedTasks }: { tasks: GroupedTasksListType } =
    useLoaderData();
  const [tasks, setTasks] = useState(groupedTasks);

  const updateTask = useCallback(
    async (taskId: string, formData: UpdateDataType) => {
      try {
        const { data }: { data: TaskType } = await api.put("/task", {
          id: taskId,
          ...formData,
        });
        setTasks((prev) => {
          const updatedTasks = prev[data.status].tasks.map((task) =>
            task._id === data._id
              ? {
                  ...task,
                  ...data,
                }
              : task
          );

          return {
            ...prev,
            [data.status]: {
              tasks: updatedTasks,
              count: prev[data.status].count,
            },
          };
        });
        toast.success("Task Updated successfully!");
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    []
  );

  const changeTaskStatus = useCallback(
    async (
      taskId: string,
      prevStatus: TaskStatusType,
      newStatus: TaskStatusType
    ) => {
      try {
        const { data }: { data: TaskType } = await api.put("/task", {
          id: taskId,
          status: newStatus,
        });

        setTasks((prev) => {
          const taskData = prev[prevStatus].tasks.find(
            (task) => task._id === taskId
          );

          const updatedPrevStatusData = {
            tasks: prev[prevStatus].tasks.filter((task) => task._id !== taskId),
            count: prev[prevStatus].count - 1,
          };
          const updatedNewStatusData = {
            tasks: [{ ...taskData, ...data }, ...prev[newStatus].tasks],
            count: prev[newStatus].count + 1,
          };

          return {
            ...prev,
            [prevStatus]: updatedPrevStatusData,
            [newStatus]: updatedNewStatusData,
          };
        });
      } catch (error) {
        apiErrorHandler(error);
      }
    },
    []
  );

  const deleteTask = useCallback(async (task: TaskWithProjectType) => {
    try {
      await api.delete(`/task/${task.project._id}/${task._id}`);

      setTasks((prev) => {
        const updatedTasks = prev[task.status].tasks.filter(
          (t) => task._id !== t._id
        );
        const updatedStatusData = {
          tasks: updatedTasks,
          count: updatedTasks.length,
        };
        return { ...prev, [task.status]: updatedStatusData };
      });

      toast.success(`Task ${task.name} deleted`);
    } catch (error) {
      apiErrorHandler(error);
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, updateTask, changeTaskStatus, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
