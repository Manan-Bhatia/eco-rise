import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        address: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
