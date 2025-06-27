import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import Team from "../models/team";

async function getUserTeams(req: AuthRequest, res: Response) {
  try {
    const userTeams = await Team.find({
      $or: [{ admin: req.user?._id }, { members: req.user?._id.toString() }],
    })
      .populate("admin", "-password")
      .populate("members", "-password")
      .lean();

    res.status(200).json(userTeams);
  } catch (error) {
    console.error("GET: /team:", error);
    res.sendStatus(500);
  }
}

async function getSearchedTeams(req: AuthRequest, res: Response) {
  const { query } = req.params;

  try {
    const teams = await Team.find({
      name: { $regex: query, $options: "i" },
    }).lean();

    res.status(200).json(teams);
  } catch (error) {
    console.error("GET /team/:query:", error);
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

    const newTeam = await Team.populate(team, {
      path: "admin",
      select: "-password",
    });
    console.log(newTeam);
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
    })
      .populate("admin")
      .lean();

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

async function assignProject(req: AuthRequest, res: Response) {
  const { projectId, teamId } = req.body;

  if (!projectId || !teamId) {
    res.status(400).json({ message: "Incomplete data provided" });
    return;
  }

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    const updatedTeam = await team
      .updateOne(
        {
          $addToSet: { projects: projectId },
        },
        { new: true }
      )
      .lean();

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("PUT /team/assign:", error);
    res.sendStatus(500);
  }
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

    if (team.admin.toString() !== req.user?._id.toString()) {
      res
        .status(401)
        .json({ message: "Unauthorized. Only admins can remove members" });
      return;
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { members: { $in: members } },
      },
      { new: true }
    )
      .populate("admin", "-password")
      .lean();

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("PUT /team/remove-member:", error);
    res.sendStatus(500);
  }
}

async function leaveTeam(req: AuthRequest, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Team ID not provided" });
    return;
  }

  try {
    const leftTeam = await Team.findByIdAndUpdate(
      id,
      {
        $pull: { members: req.user?._id.toString() },
      },
      { new: true }
    );

    if (!leftTeam) {
      res.status(404).json({ message: "Team not found, check if it exists" });
      return;
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("PUT /team/leave:", error);
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

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  getUserTeams,
  getSearchedTeams,
  createTeam,
  updateTeam,
  assignProject,
  addMember,
  removeMember,
  leaveTeam,
  deleteTeam,
};
