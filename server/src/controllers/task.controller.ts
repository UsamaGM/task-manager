import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import Task from "../models/task";
import Project from "../models/project";

async function getUserTasks(req: AuthRequest, res: Response) {}

async function createTask(req: AuthRequest, res: Response) {
  const { name, description, project, dueDate, priority } = req.body;
  try {
    const newTask = await Task.create({
      name,
      description,
      dueDate,
      priority,
    });

    const updatedProject = await Project.findByIdAndUpdate(
      project,
      {
        $push: { tasks: newTask._id },
      },
      { new: true }
    );

    res.status(201).json({ newTask, updatedProject });
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
}

export { getUserTasks, createTask };
