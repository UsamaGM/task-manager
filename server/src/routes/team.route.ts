import express from "express";
import {
  addMember,
  assignProject,
  createTeam,
  deleteTeam,
  getSearchedTeams,
  getTeamById,
  leaveTeam,
  removeMember,
  updateTeam,
} from "../controllers/team.controller";

const teamRouter = express.Router();

teamRouter.get("/:id", getTeamById);
teamRouter.get("/search/:query", getSearchedTeams);
teamRouter.post("/", createTeam);
teamRouter.put("/", updateTeam);
teamRouter.put("/assign", assignProject);
teamRouter.put("/add-member", addMember);
teamRouter.put("/remove-member", removeMember);
teamRouter.put("/leave/:id", leaveTeam);
teamRouter.delete("/:id", deleteTeam);

export default teamRouter;
