import type { Response } from "express";
import Project from "../models/project";
import type { AuthRequest } from "../middlewares/auth.middleware";

async function getAllProjects(req: AuthRequest, res: Response) {
  console.log(req.user);
}

async function createProject(req: AuthRequest, res: Response) {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await Project.create({
      name,
      description,
      startDate,
      endDate,
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { getAllProjects, createProject };
