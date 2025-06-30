import type { AuthRequest } from "../middlewares/auth.middleware";
import type { Response } from "express";
import Project from "../models/project";
import User from "../models/user";
import Task from "../models/task";
import Team from "../models/team";

async function getProjectById(req: AuthRequest, res: Response) {
  const id = req.params;
  try {
    const project = await Project.findById(id).populate("assignedTo").lean();

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("GET /project/:id:", error);
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
      _id: { $in: deletedProject.tasks },
    }).lean();

    await Team.findOneAndUpdate(
      {
        projects: id,
      },
      {
        $pull: { projects: id },
      },
      {
        new: true,
      }
    ).lean();

    res.status(200).json({ deletedProject, deletedTasks });
  } catch (error) {
    console.error("DELETE /project:", error);
    res.sendStatus(500);
  }
}

export { getProjectById, createProject, updateProject, deleteProject };
