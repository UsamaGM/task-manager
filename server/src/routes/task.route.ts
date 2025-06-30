import express from "express";
import {
  assignTaskToMember,
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";

const taskRouter = express.Router();

taskRouter.get("/:id", getTaskById);
taskRouter.post("/", createTask);
taskRouter.put("/", updateTask);
taskRouter.put("/assign", assignTaskToMember);
taskRouter.delete("/:taskId", deleteTask);

export default taskRouter;
