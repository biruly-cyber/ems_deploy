import express from "express"
import { allReport, allReportOfSpecificProject, deleteReport, reportProject, updateProjectReport } from "../controller/ReportProject.js"
import { isAuthenticated } from "../middleware/auth.js"

const router =  express.Router()


//route for new report controller 
router.post("/new",isAuthenticated, reportProject)
 
// route for get allt the report 
router.get("/all",isAuthenticated, allReport)

//route for get all report of specific id 
router.get("/:id",isAuthenticated, allReportOfSpecificProject)

//route for modify
router.put("/:id",isAuthenticated, updateProjectReport)

// route for delete report of project
router.delete("/:id",isAuthenticated, deleteReport)


export default router 