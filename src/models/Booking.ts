import mongoose, { type Document, Schema } from "mongoose"

export interface IBooking extends Document {
  trainee: mongoose.Types.ObjectId
  classSchedule: mongoose.Types.ObjectId
}

const bookingSchema = new Schema<IBooking>({
  trainee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  classSchedule: { type: Schema.Types.ObjectId, ref: "ClassSchedule", required: true },
})

export default mongoose.model<IBooking>("Booking", bookingSchema)

