import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/user";
import Team from "../models/team";
import Task, { type TaskType } from "../models/task";
import Project, { type ProjectType } from "../models/project";

async function getUserById(req: AuthRequest, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findById(id)
      .select("-password")
      .populate("projects")
      .lean();

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const teams = await Team.find({
      $or: [{ admin: id }, { members: id }],
    })
      .populate("admin", "_id username email")
      .populate("members", "_id username email")
      .populate("projects")
      .lean();

    res.status(200).json({ ...user, teams });
  } catch (error) {
    console.error("GET /user/:id:", error);
    res.sendStatus(500);
  }
}

async function getQueriedUsers(req: AuthRequest, res: Response) {
  const { query } = req.params;
  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
    query?.toLowerCase() || ""
  );

  try {
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user?._id } },
        isEmail
          ? { email: { $regex: query, $options: "i" } }
          : { username: { $regex: query, $options: "i" } },
      ],
    })
      .limit(10)
      .select("_id username email")
      .lean();

    res.status(200).json(users);
  } catch (error) {
    console.log("/user/:query Error:", error);
    res.sendStatus(500);
  }
}

async function getUserData(req: AuthRequest, res: Response) {
  const userId = req.user?._id;
  try {
    const teams = await Team.find({
      $or: [{ members: userId?.toString() }, { admin: userId }],
    })
      .populate("members", "_id username emails")
      .populate("admin", "_id username email")
      .lean();

    const user = await User.findById(userId).select("projects").lean();

    const allProjects: ProjectType[] = [];
    const allTasks: TaskType[] = [];

    teams.forEach((team) => {
      if (team.projects && Array.isArray(team.projects))
        allProjects.push(...team.projects);
    });
    if (user && user.projects && Array.isArray(user.projects)) {
      allProjects.push(...user.projects);
    }

    const projects = await Project.find({
      _id: { $in: allProjects },
    }).lean();

    projects.forEach((project) => {
      if (project.tasks && Array.isArray(project.tasks))
        allTasks.push(...project.tasks);
    });

    const tasks = await Task.find({
      _id: { $in: allTasks },
    })
      .populate("createdBy", "_id username email")
      .populate("assignedTo", "_id username email")
      .lean();

    res.status(200).json({ teams, projects, tasks });
  } catch (error) {
    console.error("GET /user/data:", error);
    res.sendStatus(500);
  }
}

export { getUserById, getQueriedUsers, getUserData };
