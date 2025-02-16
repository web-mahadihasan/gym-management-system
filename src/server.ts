import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./routes/authRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Database connection 
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Route Endpoint 
// app.use("/", (_req, res) => {
//     res.send("Server is ready for requesting")
// })

// Server Entry Point 
app.use("/api/auth", authRoutes)

// Port listen with 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
  