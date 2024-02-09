import express from "express"
import { allProject, deleteProject, newProject, specificProject, updateProject } from "../controller/Project.js"
import { isAuthenticated } from "../middleware/auth.js"

const router =  express.Router()


//route for new project 
router.post("/new",isAuthenticated, newProject)

//route  for get all the project
router.get("/all",isAuthenticated, allProject)

//route for update project
router.put("/:id",isAuthenticated, updateProject)

// route for delete project
router.delete("/:id",isAuthenticated, deleteProject)

//specific project 
router.get("/specific/:id", isAuthenticated, specificProject)



export default router