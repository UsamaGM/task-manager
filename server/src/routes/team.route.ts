import express from "express";
import {
  addMember,
  createTeam,
  deleteTeam,
  getUserTeams,
  leaveTeam,
  removeMember,
  updateTeam,
} from "../controllers/team.controller";

const teamRouter = express.Router();

teamRouter.get("/", getUserTeams);
teamRouter.post("/", createTeam);
teamRouter.put("/", updateTeam);
teamRouter.put("/add-member", addMember);
teamRouter.put("/remove-member", removeMember);
teamRouter.put("/leave/:id", leaveTeam);
teamRouter.delete("/:id", deleteTeam);

export default teamRouter;
