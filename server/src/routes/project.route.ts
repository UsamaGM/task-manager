import express from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
} from "../controllers/project.controller";

const projectRouter = express.Router();

projectRouter.get("/:id", getProjectById);
projectRouter.post("/", createProject);
projectRouter.put("/", updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
