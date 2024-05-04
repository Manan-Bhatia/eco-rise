import { NextRequest, NextResponse } from "next/server";
import AppointmentRequest from "@/models/appointmentModel";

export async function GET(request: NextRequest) {
    try {
        const appointmentRequests = await AppointmentRequest.find();
        return NextResponse.json(appointmentRequests, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error getting appointment requests" },
            { status: 500 }
        );
    }
}
