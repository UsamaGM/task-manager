import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import Task, { type TaskType } from "../models/task";
import Project from "../models/project";
import User from "../models/user";

async function getTaskById(req: AuthRequest, res: Response) {
  const id = req.params;

  try {
    const task = await Task.findById(id)
      .populate("createdBy", "_id username email")
      .populate("assignedTo", "_id username email")
      .lean();
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("GET /task/:id:", error);
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
      res.sendStatus(500);
      return;
    }

    const task = newTask.toObject();

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
    })
      .populate("assignedTo", "-password")
      .lean();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("PUT /task:", error);
    res.sendStatus(500);
  }
}

async function assignTaskToMember(req: AuthRequest, res: Response) {
  const { taskId, userId } = req.body;

  if (!taskId || !userId) {
    res.status(400).json({ message: "Incomplete data provided" });
    return;
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: userId,
      },
      { new: true }
    )
      .populate("assignedTo", "-password")
      .lean();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("PUT /task/assign:", error);
    res.sendStatus(500);
  }
}

async function deleteTask(req: AuthRequest, res: Response) {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId).lean();
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
      return;
    }

    await Project.findByIdAndUpdate(associatedProject?._id, {
      $pull: { tasks: deletedTask._id },
    }).lean();

    res.status(201).json({ message: "Deleted the Task" });
  } catch (error) {
    console.error("DELETE /task/:taskId:", error);
    res.sendStatus(500);
  }
}

export { getTaskById, createTask, updateTask, assignTaskToMember, deleteTask };
