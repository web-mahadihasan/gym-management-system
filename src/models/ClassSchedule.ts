import mongoose, { type Document, Schema } from "mongoose"

export interface IClassSchedule extends Document {
  date: Date
  startTime: string
  endTime: string
  trainer: mongoose.Types.ObjectId
  maxCapacity: number
  currentBookings: number
}

const classScheduleSchema = new Schema<IClassSchedule>({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  maxCapacity: { type: Number, default: 10 },
  currentBookings: { type: Number, default: 0 },
})

export default mongoose.model<IClassSchedule>("ClassSchedule", classScheduleSchema)

