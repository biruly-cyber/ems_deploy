import express from "express"
import { accepetedLeaveApplication, applyLeave, leaveApplicstionRequest, rejectedLeaveApplication } from "../controller/LeaveDetails.js"
import { isAuthenticated } from "../middleware/auth.js"



const router = express.Router()

router.post("/newapply",isAuthenticated, applyLeave)
router.get("/all",isAuthenticated, leaveApplicstionRequest)
router.put("/accepted/:id", isAuthenticated, accepetedLeaveApplication )
router.put("/rejected/:id", isAuthenticated, rejectedLeaveApplication)





export default router