import { NextRequest, NextResponse } from "next/server";
import getUserFromToken from "@/helpers/getUserFromToken";
import { z, ZodError } from "zod";
import { connect } from "@/helpers/dbConfig";
import EstimateRequest from "@/models/estimateRequestModel";

const estimateRequestSchema = z.object({
    service: z.enum(["5 Day Roof", "Paint", "Solar", "Roof Coating"]),
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email(),
});

const isZodError = (error: unknown): error is ZodError => {
    return error instanceof ZodError;
};

// connect to db
connect();

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);
        const reqBody: z.infer<typeof estimateRequestSchema> =
            await request.json();
        try {
            estimateRequestSchema.parse(reqBody);
        } catch (validationError: unknown) {
            if (isZodError(validationError)) {
                return NextResponse.json(
                    {
                        message: "Validation error",
                        errors: validationError.errors,
                    },
                    { status: 400 }
                );
            } else {
                return NextResponse.json(
                    { message: "Validation error", error: validationError },
                    { status: 400 }
                );
            }
        }
        const { service, name, address, phoneNumber, email } = reqBody;
        const newEstimateRequest = await EstimateRequest.create({
            user_id: user ? user._id : null,
            service,
            name,
            address,
            phoneNumber,
            email,
        });
        await newEstimateRequest.save();
        return NextResponse.json(
            { message: "Estimate request sent." },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error occured while sending estimate request." },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const requestsByUser = await EstimateRequest.find({
            user_id: user._id,
        });
        if (requestsByUser.length > 0)
            return NextResponse.json(requestsByUser, { status: 200 });
        else
            return NextResponse.json({
                message: "No estimate requests found.",
            });
    } catch (error) {
        return NextResponse.json(
            { message: "Error occured while getting your estimate request." },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const reqBody: { id: string } = await request.json();
        const { id } = reqBody;
        const deletedContactRequest = await EstimateRequest.findByIdAndDelete(
            id
        );
        if (!deletedContactRequest)
            return NextResponse.json(
                {
                    message: "Estimate request not found.",
                },
                {
                    status: 404,
                }
            );
        else
            return NextResponse.json(
                {
                    message: "Estimate request deleted successfully.",
                },
                {
                    status: 200,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while deleting your estimate request.",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, ...updatedData } = reqBody;
        const updatedEstimateRequest = await EstimateRequest.findOneAndUpdate(
            { _id },
            { $set: updatedData },
            { new: true }
        );
        if (!updatedEstimateRequest)
            return NextResponse.json(
                {
                    message: "Estimate request not found.",
                },
                {
                    status: 404,
                }
            );
        else
            return NextResponse.json(
                {
                    message: "Estimate request updated successfully.",
                },
                {
                    status: 200,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while updating your Estimate request.",
            },
            {
                status: 500,
            }
        );
    }
}
