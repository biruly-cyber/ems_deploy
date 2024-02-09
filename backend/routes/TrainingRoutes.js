import express, { Router } from "express";
import { addTraining, showtraining } from "../controller/Training.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

router.post("/newTraining", isAuthenticated, addTraining)

router.get("/showTraining", isAuthenticated, showtraining)

export default router;