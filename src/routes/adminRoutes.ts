import express from "express"
import { createTrainer, createClassSchedule, getAllTrainers, getAllSchedules, getAllTrinee, removeTrainer } from "../controllers/adminController"
import { protect, authorize } from "../middleware/authMiddleware"

const adminRoutes = express.Router()

adminRoutes.use(protect)
adminRoutes.use(authorize("admin"))

adminRoutes.post("/create-trainer", createTrainer)
adminRoutes.post("/create-class-schedule", createClassSchedule)
adminRoutes.get("/trainers", getAllTrainers)
adminRoutes.get("/trainee", getAllTrinee)
adminRoutes.get("/all-schedules", getAllSchedules)
adminRoutes.put("/remove-trainer/:trainerId", removeTrainer)

export default adminRoutes

