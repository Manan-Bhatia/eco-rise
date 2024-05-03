import { NextRequest, NextResponse } from "next/server";
import EstimateRequest from "@/models/estimateRequestModel";

export async function GET(request: NextRequest) {
    try {
        const estimateRequests = await EstimateRequest.find();
        return NextResponse.json(estimateRequests, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error getting contact requests" },
            { status: 500 }
        );
    }
}
