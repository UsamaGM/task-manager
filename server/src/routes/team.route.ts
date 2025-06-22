import express from "express";
import {
  createTeam,
  deleteTeam,
  getUserTeams,
  updateTeam,
} from "../controllers/team.controller";

const teamRouter = express.Router();

teamRouter.get("/", getUserTeams);
teamRouter.post("/", createTeam);
teamRouter.put("/", updateTeam);
teamRouter.delete("/:id", deleteTeam);

export default teamRouter;
