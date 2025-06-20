import type { Response } from "express";
import Project from "../models/project";
import type { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/user";

async function getAllProjects(req: AuthRequest, res: Response) {
  const { _id } = req.user!;
  try {
    const userProjects = await User.findById(_id).populate("projects");

    res.status(200).json(userProjects);
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
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

    await User.findByIdAndUpdate(req.user?._id, {
      $push: { projects: newProject._id },
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { getAllProjects, createProject };
