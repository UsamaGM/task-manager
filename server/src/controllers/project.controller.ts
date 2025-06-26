import type { Response } from "express";
import Project, { type ProjectStatusType } from "../models/project";
import type { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/user";
import Task from "../models/task";

async function getAllProjects(req: AuthRequest, res: Response) {
  const { _id } = req.user!;
  try {
    const user = await User.findById(_id).populate("projects").lean();

    if (!user) {
      res.status(404).json({ message: "User not found, are you signed in?" });
      return;
    }

    res.status(200).json(user.projects);
  } catch (error) {
    console.error("GET /project:", error);
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

async function updateProject(req: AuthRequest, res: Response) {
  const { id, data } = req.body;
  if (!id) {
    res.status(400).json({ message: "Invalid" });
    return;
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();

    if (!updateProject) {
      res.status(404).json({ message: "Invalid Project ID" });
      return;
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function deleteProject(req: AuthRequest, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "No Project ID provided" });
    return;
  }

  try {
    const deletedProject = await Project.findByIdAndDelete(id).lean();
    if (!deletedProject) {
      res.status(400).json({ message: "Invalid Project ID" });
      return;
    }

    const deletedTasks = await Task.deleteMany({
      _id: deletedProject.tasks,
    }).lean();

    res.status(200).json({ deletedProject, deletedTasks });
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
}

export { getAllProjects, createProject, updateProject, deleteProject };
