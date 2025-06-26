import express from "express";
import {
  createTask,
  deleteTask,
  getUserTasks,
  updateTask,
} from "../controllers/task.controller";

const taskRouter = express.Router();

taskRouter.get("/", getUserTasks);
taskRouter.post("/", createTask);
taskRouter.put("/", updateTask);
taskRouter.delete("/:taskId", deleteTask);

export default taskRouter;
