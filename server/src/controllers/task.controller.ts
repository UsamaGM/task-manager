import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import Task, { type TaskStatusType } from "../models/task";
import Project, { type ProjectType } from "../models/project";
import User from "../models/user";
import type { ObjectId } from "mongoose";

async function getUserTasks(req: AuthRequest, res: Response) {
  const userId = req.user?._id;

  try {
    const user = await User.findById(userId).select("projects").lean();

    const projects = await Project.find({
      _id: { $in: user?.projects },
    })
      .select("tasks")
      .lean();

    const projectMap: Map<string, any> = new Map();
    const allTasks: ObjectId[] = [];

    projects.forEach((project) => {
      if (project.tasks && Array.isArray(project.tasks)) {
        project.tasks.forEach((taskId) => {
          projectMap.set(taskId.toString(), project);
          allTasks.push(taskId);
        });
      }
    });

    const tasks = await Task.find({
      _id: { $in: allTasks },
    }).lean();

    const groupedTasks = tasks.reduce((acc, task) => {
      const status = task.status as TaskStatusType;
      if (!acc[status]) acc[status] = [];

      const project = projectMap.get(task._id.toString());
      const taskWithProject = {
        ...task,
        project,
      };

      acc[status].push(taskWithProject);
      return acc;
    }, {} as Record<TaskStatusType, any[]>);

    const userTasks = {
      todo: {
        tasks: groupedTasks.todo || [],
        count: (groupedTasks.todo || []).length,
      },
      "in-progress": {
        tasks: groupedTasks["in-progress"] || [],
        count: (groupedTasks["in-progress"] || []).length,
      },
      done: {
        tasks: groupedTasks.done || [],
        count: (groupedTasks.done || []).length,
      },
    };

    res.status(200).json(userTasks);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function createTask(req: AuthRequest, res: Response) {
  const { name, description, project, dueDate, priority } = req.body;
  try {
    const newTask = await Task.create({
      name,
      description,
      dueDate,
      priority,
    });

    const updatedProject = await Project.findByIdAndUpdate(
      project,
      {
        $push: { tasks: newTask._id },
      },
      { new: true }
    );

    res.status(201).json({ newTask, updatedProject });
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
}

export { getUserTasks, createTask };
