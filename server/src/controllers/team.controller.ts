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
  const { name, description } = req.body;

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
      members: [{ user: req.user?._id, role: "admin" }],
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

async function addMember(req: AuthRequest, res: Response) {
  const {
    teamId,
    members,
  }: { teamId: string; members: { user: string; role: string }[] } = req.body;

  if (!teamId) {
    res.status(400).json({ message: "Team ID not provided" });
    return;
  }

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      res.status(404).json({
        message: "Invalid Team ID provided, check if the team exists",
      });
      return;
    }

    if (
      !team.members.some(
        (u) =>
          u.user.toString() === req.user?._id.toString() && u.role === "admin"
      )
    ) {
      res
        .status(401)
        .json({ message: "Unauthorized. Only admins can add new members" });
      return;
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: { members },
      },
      { new: true }
    )
      .populate("members.user", "-password")
      .populate("projects")
      .lean();

    console.log(updatedTeam);

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Add member error:", error);
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

export { getUserTeams, createTeam, updateTeam, addMember, deleteTeam };
