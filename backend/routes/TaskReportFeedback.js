import express from "express"
import { isAuthenticated } from "../middleware/auth.js"
import { allFeedback, taskReportFeedback } from "../controller/TaskFeedback.js"

const router = express.Router()

//router for new feedback
router.post("/new", isAuthenticated, taskReportFeedback)

//ROUTER FOR GET ALL THE FEEDBACK
router.get("/all", isAuthenticated, allFeedback)


export default router