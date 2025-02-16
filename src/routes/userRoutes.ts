import express from "express"
import { getAdmin, updateProfile, userByEmail } from "../controllers/userController"
// import { protect } from "../middleware/authMiddleware"

const userRoutes = express.Router()

// router.use(protect)

userRoutes.put("/update-profile/:id", updateProfile)

userRoutes.get("/all-user/:email", userByEmail)

userRoutes.get("/admin/:email", getAdmin)

export default userRoutes

