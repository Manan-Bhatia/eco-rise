import { NextRequest, NextResponse } from "next/server";
import getUserFromToken from "@/helpers/getUserFromToken";
import { z, ZodError } from "zod";
import { connect } from "@/helpers/dbConfig";
import AppointmentRequest from "@/models/appointmentModel";

const bookAppointmentSchema = z.object({
    service: z.enum(["5 Day Roof", "Paint", "Solar", "Roof Coating"]),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    address: z.string(),
    appointmentDate: z.string(),
    appointmentTime: z.string(),
});

const isZodError = (error: unknown): error is ZodError => {
    return error instanceof ZodError;
};

// connect to db
connect();

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);
        const reqBody: z.infer<typeof bookAppointmentSchema> =
            await request.json();
        try {
            bookAppointmentSchema.parse(reqBody);
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
        const {
            service,
            name,
            address,
            phoneNumber,
            email,
            appointmentDate,
            appointmentTime,
        } = reqBody;
        const newAppointmentRequest = await AppointmentRequest.create({
            user_id: user ? user._id : null,
            service,
            appointmentDate,
            appointmentTime,
            name,
            address,
            phoneNumber,
            email,
        });
        await newAppointmentRequest.save();
        return NextResponse.json(
            { message: "Appointment request sent." },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while sending appointment request.",
                error,
            },
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
        let requestsByUser = await AppointmentRequest.find({
            user_id: user._id,
        });
        if (requestsByUser.length > 0) {
            requestsByUser = requestsByUser.map((appointmentrequest) => {
                return {
                    ...appointmentrequest._doc,
                    appointmentDate: new Date(
                        appointmentrequest.appointmentDate
                    ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }),
                };
            });
            return NextResponse.json(requestsByUser, { status: 200 });
        } else
            return NextResponse.json({
                message: "No appointments found.",
            });
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    "Error occured while getting your appointment request.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const reqBody: { id: string } = await request.json();
        const { id } = reqBody;
        const deletedContactRequest =
            await AppointmentRequest.findByIdAndDelete(id);
        if (!deletedContactRequest)
            return NextResponse.json(
                {
                    message: "appopintment not found.",
                },
                {
                    status: 404,
                }
            );
        else
            return NextResponse.json(
                {
                    message: "appointment request deleted successfully.",
                },
                {
                    status: 200,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    "Error occured while deleting your appointment request.",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, ...updatedData } = reqBody;
        const updatedEstimateRequest =
            await AppointmentRequest.findOneAndUpdate(
                { _id },
                { $set: updatedData },
                { new: true }
            );
        if (!updatedEstimateRequest)
            return NextResponse.json(
                {
                    message: "appointment not found.",
                },
                {
                    status: 404,
                }
            );
        else
            return NextResponse.json(
                {
                    message: "appointment request updated successfully.",
                },
                {
                    status: 200,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    "Error occured while updating your appointment request.",
            },
            {
                status: 500,
            }
        );
    }
}
