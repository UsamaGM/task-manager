import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import Team from "../models/team";

async function getUserTeams(req: AuthRequest, res: Response) {
  try {
    const userProjects = await Team.find({
      $or: [{ admin: req.user?._id }, { members: req.user?._id }],
    })
      .populate("admin", "-password")
      .populate("members", "-password")
      .populate("projects")
      .lean();

    res.status(200).json(userProjects);
  } catch (error) {
    console.error("GET: /team:", error);
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
      admin: req.user?._id,
    });

    const newTeam = await (
      await (
        await team.populate("admin", "-password")
      ).populate("members", "-password")
    ).populate("projects");

    res.status(201).json(newTeam);
  } catch (error) {
    console.error("POST: /team:", error);
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

interface MemberRequestType {
  teamId: string;
  members: string[];
}

async function addMember(req: AuthRequest, res: Response) {
  const { teamId, members }: MemberRequestType = req.body;

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

    if (team.admin.toString() !== req.user?._id.toString()) {
      res
        .status(401)
        .json({ message: "Unauthorized. Only admins can add new members" });
      return;
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { members: { $each: members } },
      },
      { new: true }
    )
      .populate("admin", "-password")
      .populate("members", "-password")
      .populate("projects")
      .lean();

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("PUT /team/add-member:", error);
    res.sendStatus(500);
  }
}

async function removeMember(req: AuthRequest, res: Response) {
  const { teamId, members }: MemberRequestType = req.body;

  if (!teamId) {
    res.status(400).json({ message: "Team ID not provided" });
    return;
  }

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      res.status(404).json({ message: "Team not found, check if team exists" });
      return;
    }

    if (team.admin !== req.user?._id) {
      res
        .status(401)
        .json({ message: "Unauthorized. Only admins can remove members" });
      return;
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { members: { $each: members } },
      },
      { new: true }
    ).lean();

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("PUT /team/remove-member:", error);
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

export {
  getUserTeams,
  createTeam,
  updateTeam,
  addMember,
  removeMember,
  deleteTeam,
};
