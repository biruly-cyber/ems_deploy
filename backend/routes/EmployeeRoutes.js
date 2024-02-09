import express from "express"
import { allEmployee, deleteEmployee, newEmployee, updateEmployee } from "../controller/Employee.js"
import { isAuthenticated } from "../middleware/auth.js"



const router = express.Router()

//routes for new employee
router.post("/new",isAuthenticated, newEmployee)


//routes form get all the employee details
router.get("/all",isAuthenticated, allEmployee)

// routes for update the employee details
router.put("/:id",isAuthenticated, updateEmployee)

// routes for delete the employee details
router.delete("/:id",isAuthenticated, deleteEmployee)

export default router
