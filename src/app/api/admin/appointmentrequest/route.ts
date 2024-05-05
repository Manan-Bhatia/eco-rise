import { NextRequest, NextResponse } from "next/server";
import AppointmentRequest from "@/models/appointmentModel";

import { connect } from "@/helpers/dbConfig";
connect();
export async function GET(request: NextRequest) {
    try {
        let appointmentRequests = await AppointmentRequest.find();
        appointmentRequests = appointmentRequests.map((appointmentRequest) => {
            return {
                ...appointmentRequest._doc,
                appointmentDate: new Date(
                    appointmentRequest.appointmentDate
                ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
            };
        });
        return NextResponse.json(appointmentRequests, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error getting appointment requests" },
            { status: 500 }
        );
    }
}
