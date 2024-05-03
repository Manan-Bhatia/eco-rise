import { NextRequest, NextResponse } from "next/server";
import verifyAdminStatusFromToken from "@/helpers/verifyAdminStatusFromToken";
import User from "@/models/userModel";
import ContactRequest from "@/models/contactRequestModel";
import EstimateRequest from "@/models/estimateRequestModel";
import Appointment from "@/models/appointmentModel";
import { connect } from "@/helpers/dbConfig";
connect();
export async function GET(request: NextRequest) {
    try {
        if (await verifyAdminStatusFromToken(request)) {
            const users = await User.find();
            let contactRequests = await ContactRequest.find();
            contactRequests = contactRequests.filter(
                (req) => req.status != "closed"
            );
            let estimateRequests = await EstimateRequest.find();
            estimateRequests = estimateRequests.filter(
                (req) => req.status != "closed"
            );
            let appointments = await Appointment.find();
            appointments = appointments.filter(
                (req) => req.status != "completed"
            );

            return NextResponse.json(
                {
                    users: users.length,
                    pendingContactRequests: contactRequests.length,
                    pendingEstimateRequests: estimateRequests.length,
                    pendingAppointments: appointments.length,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Error in getting admin details" },
            { status: 500 }
        );
    }
}
