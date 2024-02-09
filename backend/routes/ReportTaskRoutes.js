import express from "express"
import { allReport, allTaskReport, deleteReport, reportTask, updateReport } from "../controller/ReportTask.js"
import { isAuthenticated } from "../middleware/auth.js"

const router =  express.Router()

//route for new task report controller
router.post("/:id",isAuthenticated, reportTask)


//route for get all task
router.get("/:id", allReport)


//get all task report by specific project
router.get("/specific/:id", isAuthenticated, allTaskReport)

//route for update specific report 
// router.put("/:id",isAuthenticated, updateReport)

//route for delete report
// router.delete("/:id",isAuthenticated, deleteReport)


export default router 