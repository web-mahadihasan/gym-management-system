import type { Request, Response } from "express"
import User from "../models/User"
import ClassSchedule from "../models/ClassSchedule"

export const createTrainer = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const trainerExists = await User.findOne({ email })
    if (trainerExists) {
      return res.status(400).json({ success: false, message: "Trainer already exists" })
    }

    const trainer = await User.create({ name, email, password, role: "trainer" })

    return res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: {
        _id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        role: trainer.role,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error })
  }
}

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

export const createClassSchedule = async (req: Request, res: Response) => {
  try {
    const { date, title, startTime, endTime, trainerId } = req.body

    console.log("Received date:", date);
    const scheduleDate = new Date(date);
    console.log("Parsed date:", scheduleDate);
    
    const existingSchedules = await ClassSchedule.find({ date: scheduleDate })

    if (existingSchedules.length >= 5) {
      return res.status(400).json({ success: false, message: "Maximum 5 schedules per day allowed" })
    }

    const newSchedule = await ClassSchedule.create({
      date: scheduleDate,
      title,
      startTime,
      endTime,
      trainer: trainerId,
    })

    return res.status(201).json({
      success: true,
      message: "Class schedule created successfully",
      data: newSchedule,
    })
  } catch (error) {
    console.error("Error creating class schedule:", error);
    return res.status(500).json({ success: false, message: "Server error", error })
  }
}

