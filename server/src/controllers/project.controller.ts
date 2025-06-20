import type { Request, Response } from "express";
import Project from "../models/project";

async function getAllProjects(req: Request, res: Response) {
  res.status(200).json([]);
}

async function createProject(req: Request, res: Response) {
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
