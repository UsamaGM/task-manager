import express from "express";
import {
  createProject,
  getAllProjects,
} from "../controllers/project.controller";

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.post("/", createProject);

export default projectRouter;
