import express from "express"
import { getMyProfile, login, logout, registration,  } from "../controller/User.js"
import { isAuthenticated } from "../middleware/auth.js"

const router  =  express.Router()


//routes for registration
router.post("/signup", registration)

//routes for login
router.post("/login", login)

//routes for get profile
router.get("/me",isAuthenticated, getMyProfile)

//route for logout
router.get("/logout", logout)

export default router

