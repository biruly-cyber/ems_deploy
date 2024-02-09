import express from "express";
import {allTeams, deleteTeam, teamDetail, updateTeam} from "../controller/Teams.js"
import { isAuthenticated } from "../middleware/auth.js"



const router = express.Router()



//routes for new Team Creation
router.post("/CreateNewTeam",isAuthenticated, teamDetail)

// router for geting all data of new Team 
router.get("/allTeams",isAuthenticated, allTeams)


// router for Updateing current team 
router.put("/updateTeam/:id", isAuthenticated, updateTeam)

// router for deleting current  team
router .delete("/deleteTeam/:id",  deleteTeam)
export default router
