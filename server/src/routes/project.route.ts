import express from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
} from "../controllers/project.controller";

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.post("/", createProject);
projectRouter.put("/", updateProject);

export default projectRouter;
