import { z } from "zod";

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Project schemas
export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

// Task schemas
export const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Task description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a priority level" }),
  }),
  projectId: z.string().min(1, "Please select a project"),
});

// Team schemas
export const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  description: z.string().min(1, "Team description is required"),
});

// Type exports for convenience
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type TeamFormData = z.infer<typeof teamSchema>;