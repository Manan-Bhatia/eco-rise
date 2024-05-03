import { NextRequest, NextResponse } from "next/server";
import ContactRequest from "@/models/contactRequestModel";

export async function GET(request: NextRequest) {
    try {
        const contactRequests = await ContactRequest.find();
        return NextResponse.json(contactRequests, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error getting contact requests" },
            { status: 500 }
        );
    }
}
