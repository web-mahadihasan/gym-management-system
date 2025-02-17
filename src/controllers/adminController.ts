import type { Request, Response } from "express"
import User from "../models/User"
import ClassSchedule from "../models/ClassSchedule"

export const createTrainer = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body
  
      const user = await User.findOne({ email })
  
      if (user) {
        if (user.role === "trainer") {
          return res.status(400).json({ success: false, message: "Trainer already exists" })
        } else {
          // Update existing user's role to trainer
          user.role = "trainer"
          await user.save()
  
          return res.status(200).json({
            success: true,
            message: "User role updated to trainer successfully",
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          })
        }
      } else {
        // Create new user with trainer role
        const newTrainer = await User.create({ name, email, password, role: "trainer" })
  
        return res.status(201).json({
          success: true,
          message: "Trainer created successfully",
          data: {
            _id: newTrainer._id,
            name: newTrainer.name,
            email: newTrainer.email,
            role: newTrainer.role,
          },
        })
      }
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

// Get user 
export const getAllTrinee = async (_req: Request, res: Response) => {
    try {
      const trainers = await User.find({ role: "trainee" }).select("-password")
  
      res.json({
        success: true,
        message: "Trainee retrieved successfully",
        data: trainers,
      })
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error })
    }
}

// Create class Schedule 
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

// Get all schedules from today to future
export const getAllSchedules = async (_req: Request, res: Response) => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
  
      const schedules = await ClassSchedule.find({ date: { $gte: today } })
        .populate("trainer", "name")
        .sort({ date: 1, startTime: 1 })
  
      return res.status(200).json({
        success: true,
        message: "Schedules retrieved successfully",
        data: schedules,
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error })
    }
}


// Remove from trainer 
export const removeTrainer = async (req: Request, res: Response) => {
    try {
      const { trainerId } = req.params
      const user = await User.findById(trainerId)
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" })
      }
  
      if (user.role !== "trainer") {
        return res.status(400).json({ success: false, message: "User is not a trainer" })
      }
  
      user.role = "trainee"
      await user.save()
  
      return res.status(200).json({
        success: true,
        message: "Trainer role removed successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error })
    }
}
  