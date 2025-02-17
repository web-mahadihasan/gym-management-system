import mongoose, { type Document, Schema } from "mongoose"

export interface IBooking extends Document {
  trainee: mongoose.Types.ObjectId
  classSchedule: mongoose.Types.ObjectId
  bookingDate: Date,
  schedule: {
    Classdate: Date
    title: string
    startTime: string
    endTime: string
  }
}

const bookingSchema = new Schema<IBooking>({
  trainee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  classSchedule: { type: Schema.Types.ObjectId, ref: "ClassSchedule", required: true },
  bookingDate: { type: Date, required: true },
  schedule: {
    Classdate: { type: Date, required: true },
    title: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  }
})

export default mongoose.model<IBooking>("Booking", bookingSchema)

