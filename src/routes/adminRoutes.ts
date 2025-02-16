import express from "express"
import {getAllTrainers } from "../controllers/adminController"

const adminRoutes = express.Router()


adminRoutes.get("/trainers", getAllTrainers)

export default adminRoutes

