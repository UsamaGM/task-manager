import express from "express";
import {
  addMember,
  createTeam,
  deleteTeam,
  getUserTeams,
  updateTeam,
} from "../controllers/team.controller";

const teamRouter = express.Router();

teamRouter.get("/", getUserTeams);
teamRouter.post("/", createTeam);
teamRouter.put("/add-member", addMember);
teamRouter.put("/", updateTeam);
teamRouter.delete("/:id", deleteTeam);

export default teamRouter;
