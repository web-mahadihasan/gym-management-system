import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000


// Route Endpoint 
app.use("/", (_req, res) => {
    res.send("Server is ready for requesting")
})

// Port listen with 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
  