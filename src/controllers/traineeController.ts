import type { Request, Response } from "express"
import ClassSchedule from "../models/ClassSchedule"
import Booking from "../models/Booking"
import { startOfDay, endOfDay } from "date-fns"


// Booked class for trainee 
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
      bookingDate: new Date(),
      schedule: {
        Classdate: schedule.date,
        title: schedule.title,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      }
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

// Get all Class for Trainee 

export const getClassSchedules = async (req: Request, res: Response) => {
    try {
      const { date } = req.query
      let query = {}
  
      if (date) {
        const searchDate = new Date(date as string)
        query = {
          date: {
            $gte: startOfDay(searchDate),
            $lte: endOfDay(searchDate),
          },
        }
      }
  
      const schedules = await ClassSchedule.find(query).populate("trainer", "name").sort({ date: 1, startTime: 1 })
  
      res.json({
        success: true,
        message: "Class schedules retrieved successfully",
        data: schedules,
      })
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error })
    }
}


export const getMyBookings = async (req: Request, res: Response) => {
    try {
      const traineeId = req.params.id
  
      const myBookings = await Booking.find({ trainee: traineeId }).sort({ "bookingDate": 1 })
  
      res.json({
        success: true,
        message: "Trainee bookings retrieved successfully",
        myBookings,
      })
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error })
    }
}

// Cancel Booking class 
export const cancelBooking = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params
  
      const booking = await Booking.findOne({ _id: bookingId })
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" })
      }
  
      const schedule = await ClassSchedule.findById(booking.classSchedule)
      if (schedule) {
        schedule.currentBookings -= 1
        await schedule.save()
      }
  
      await booking.remove()
  
      return res.json({
        success: true,
        message: "Booking cancelled successfully",
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error })
    }
}