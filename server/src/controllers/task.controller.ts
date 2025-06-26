import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import Task, { type TaskType } from "../models/task";
import Project from "../models/project";
import User from "../models/user";

async function getUserTasks(req: AuthRequest, res: Response) {
  const userId = req.user?._id;

  try {
    const user = await User.findById(userId).select("projects").lean();

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const projects = await Project.find({
      _id: { $in: user.projects },
    }).lean();

    const allTasks: TaskType[] = [];

    projects.forEach((project) => {
      if (project.tasks && Array.isArray(project.tasks))
        project.tasks.forEach((taskId) => allTasks.push(taskId));
    });

    const tasks = await Task.find({
      _id: { $in: allTasks },
    }).lean();

    res.status(200).json(tasks);
  } catch (error) {
    console.error("GET /task:", error);
    res.sendStatus(500);
  }
}

async function createTask(req: AuthRequest, res: Response) {
  const { taskData }: { taskData: Partial<TaskType> & { project: string } } =
    req.body;

  try {
    const newTask = await Task.create({
      name: taskData.name,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
    });

    const updatedProject = await Project.findByIdAndUpdate(
      taskData.project,
      {
        $push: { tasks: newTask._id },
      },
      { new: true }
    ).lean();

    if (!updatedProject) {
      await Task.findByIdAndDelete(newTask._id);
      res.status(400).json({ message: "Invalid projectId provided" });
      return;
    }

    const task = newTask.toObject();

    console.log(task);

    res.status(201).json(task);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
}

async function updateTask(req: AuthRequest, res: Response) {
  const { id, updateData } = req.body;

  if (!id) {
    res.status(400).json({ message: "Id not provided" });
    return;
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function deleteTask(req: AuthRequest, res: Response) {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      res.status(400).json({
        message: "Invalid Request, Task was not found",
      });
      return;
    }

    const associatedProject = await Project.findOne({
      tasks: deletedTask._id,
    });

    if (!associatedProject) {
      res.status(400).json({ message: "" });
    }

    await Project.findByIdAndUpdate(
      associatedProject?._id,
      {
        $pull: { tasks: taskId },
      },
      { new: true }
    );

    res.status(201).json({ message: "Deleted the Task" });
  } catch (error) {
    console.error("DELETE /task/:taskId:", error);
    res.sendStatus(500);
  }
}

export { getUserTasks, createTask, updateTask, deleteTask };
