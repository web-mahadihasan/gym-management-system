import express from "express"
import { bookClass, getClassSchedules, cancelBooking} from "../controllers/traineeController"
import { protect, authorize } from "../middleware/authMiddleware"

const traineeRoutes = express.Router()

traineeRoutes.use(protect)
traineeRoutes.use(authorize("trainee"))

traineeRoutes.post("/book-class/:id", bookClass)
traineeRoutes.get("/class-schedules", getClassSchedules)
traineeRoutes.delete("/cancel-booking/:bookingId", cancelBooking)

export default traineeRoutes

