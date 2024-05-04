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
    name: String,
    email: String,
    phoneNumber: String,
    address: String,
    appointmentDate: Date,
    appointmentTime: String,
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
});

const AppointmentRequest =
    mongoose.models.appointments ||
    mongoose.model("appointments", appointmentSchema);

export default AppointmentRequest;
