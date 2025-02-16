import type { Request, Response } from "express"
import User from "../models/User"
import ClassSchedule from "../models/ClassSchedule"



export const getAllTrainers = async (_req: Request, res: Response) => {
  try {
    const trainers = await User.find({ role: "trainer" }).select("-password")

    res.json({
      success: true,
      message: "Trainers retrieved successfully",
      data: trainers,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}
