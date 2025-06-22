import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/project.controller";

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.post("/", createProject);
projectRouter.put("/", updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
