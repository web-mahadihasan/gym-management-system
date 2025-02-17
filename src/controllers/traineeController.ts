import type { Request, Response } from "express"
import ClassSchedule from "../models/ClassSchedule"
import Booking from "../models/Booking"
// import { startOfDay, endOfDay } from "date-fns"

export const bookClass = async (req: Request, res: Response) => {
  try {
    const { traineeId } = req.body
    const scheduleId = req.params.id

    const schedule = await ClassSchedule.findById(scheduleId)
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Class schedule not found" })
    }

    if (schedule.currentBookings >= schedule.maxCapacity) {
      return res
        .status(400)
        .json({ success: false, message: "Class schedule is full. Maximum 10 trainees allowed per schedule." })
    }

    const existingBooking = await Booking.findOne({ trainee: traineeId, classSchedule: scheduleId })
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "You have already booked this class" })
    }

    const booking = await Booking.create({
      trainee: traineeId,
      classSchedule: scheduleId,
    })

    schedule.currentBookings += 1
    await schedule.save()

    return res.status(201).json({
      success: true,
      message: "Class booked successfully",
      data: booking,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error })
  }
}


