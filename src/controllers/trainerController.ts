import type { Request, Response } from "express"
import ClassSchedule from "../models/ClassSchedule"

export const getTrainerSchedules = async (req: Request, res: Response) => {
  try {
    const trainerId = req.params.id
    const schedules = await ClassSchedule.find({ trainer: trainerId })

    res.json({
      success: true,
      message: "Trainer schedules retrieved successfully",
      data: schedules,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
}

