import express from "express"
import { createTrainer, createClassSchedule, getAllTrainers } from "../controllers/adminController"
import { protect, authorize } from "../middleware/authMiddleware"

const adminRoutes = express.Router()

adminRoutes.use(protect)
adminRoutes.use(authorize("admin"))

adminRoutes.post("/create-trainer", createTrainer)
adminRoutes.post("/create-class-schedule", createClassSchedule)
adminRoutes.get("/trainers", getAllTrainers)

export default adminRoutes

