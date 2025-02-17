import express from "express"
import { getTrainerSchedules } from "../controllers/trainerController"
import { protect, authorize } from "../middleware/authMiddleware"

const trainerRoutes = express.Router()

trainerRoutes.use(protect)
trainerRoutes.use(authorize("trainer"))

trainerRoutes.get("/schedules/:id", getTrainerSchedules)

export default trainerRoutes

