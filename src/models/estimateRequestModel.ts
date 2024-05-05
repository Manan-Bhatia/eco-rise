import mongoose from "mongoose";

const estimateRequestSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        service: {
            type: String,
            enum: ["5 Day Roof", "Paint", "Solar", "Roof Coating"],
        },
        name: String,
        address: String,
        phoneNumber: String,
        email: String,
        status: {
            type: String,
            enum: ["pending", "closed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const EstimateRequest =
    mongoose.models.estimaterequests ||
    mongoose.model("estimaterequests", estimateRequestSchema);

export default EstimateRequest;
