import express from "express"
import { checkAuth, getAdmin, updateProfile, userByEmail } from "../controllers/userController"
// import { protect } from "src/middleware/authMiddleware"
import { protect } from "../middleware/authMiddleware"

const userRoutes = express.Router()

userRoutes.use(protect)

userRoutes.put("/update-profile/:id", updateProfile)

userRoutes.get("/all-user/:email", userByEmail)

userRoutes.get("/admin/:email", getAdmin)

userRoutes.get("/check-auth", protect, checkAuth)

export default userRoutes

