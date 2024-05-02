import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    service: {
        type: String,
        enum: ["5 Day Roof", "Paint", "Solar", "Roof Coating"],
    },
    appointmentDate: Date,
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
});

const Appointment =
    mongoose.models.appointments ||
    mongoose.model("appointments", appointmentSchema);

export default Appointment;
