import mongoose from "mongoose";

const contactRequestSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: String,
    email: String,
    subject: String,
    message: String,
    status: {
        type: String,
        enum: ["pending", "closed"],
        default: "pending",
    },
},{timestamps:true});

const ContactRequest =
    mongoose.models.contactrequests ||
    mongoose.model("contactrequests", contactRequestSchema);

export default ContactRequest;
