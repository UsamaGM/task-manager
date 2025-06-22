import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import Team from "../models/team";

async function getUserTeams(req: AuthRequest, res: Response) {
  try {
    const userProjects = await Team.find({
      "members.user": req.user?._id,
    })
      .populate("members.user", "-password")
      .populate("projects")
      .lean();

    res.status(200).json(userProjects);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function createTeam(req: AuthRequest, res: Response) {
  const { name, description, members, projects } = req.body;

  if (!name) {
    res.status(400).json({ message: "No name provided! Name is required" });
    return;
  }
  if (!description) {
    res
      .status(400)
      .json({ message: "No description provided. It helps identify purpose" });
    return;
  }

  try {
    const team = await Team.create({
      name,
      description,
      members: [{ user: req.user?._id, role: "admin" }, ...members],
      projects,
    });

    const newTeam = await (
      await team.populate("members.user", "-password")
    ).populate("projects");

    res.status(201).json(newTeam);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function updateTeam(req: AuthRequest, res: Response) {
  const { teamId, updatedData } = req.body;

  if (!teamId) {
    res.status(400).json({ message: "No Team ID provided" });
    return;
  }

  try {
    const updatedTeam = await Team.findByIdAndUpdate(teamId, updatedData, {
      new: true,
    }).lean();

    if (!updatedTeam) {
      res
        .status(404)
        .json({ message: "Team not found. Check if team exists." });
      return;
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function deleteTeam(req: AuthRequest, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "No Team ID provided" });
    return;
  }

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      res.status(404).json({ message: "Team not found. Check if team exists" });
      return;
    }

    res.status(200).json(deletedTeam);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { getUserTeams, createTeam, updateTeam, deleteTeam };
