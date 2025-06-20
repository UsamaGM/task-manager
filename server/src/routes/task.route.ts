import express from "express";
import { createTask, getUserTasks } from "../controllers/task.controller";

const taskRouter = express.Router();

taskRouter.get("/", getUserTasks);
taskRouter.post("/", createTask);

export default taskRouter;
