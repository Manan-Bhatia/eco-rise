import { NextRequest, NextResponse } from "next/server";
import getUserFromToken from "@/helpers/getUserFromToken";
import { z, ZodError } from "zod";
import { connect } from "@/helpers/dbConfig";
import ContactRequest from "@/models/contactRequestModel";

const contactUsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    subject: z.string(),
    message: z.string().min(1, "Message is required"),
});
const isZodError = (error: unknown): error is ZodError => {
    return error instanceof ZodError;
};

// connect to db
connect();

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);
        const reqBody: z.infer<typeof contactUsSchema> = await request.json();
        try {
            contactUsSchema.parse(reqBody);
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
        const { firstName, lastName, email, subject, message } = reqBody;
        const newContactRequest = await ContactRequest.create({
            user_id: user ? user._id : null,
            name: firstName + " " + lastName,
            email,
            subject,
            message,
        });
        await newContactRequest.save();
        return NextResponse.json(
            { message: "Contact request sent." },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error occured while sending contact request." },
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
        const requestsByUser = await ContactRequest.find({ user_id: user._id });
        if (requestsByUser.length > 0)
            return NextResponse.json(requestsByUser, { status: 200 });
        else
            return NextResponse.json({ message: "No contact requests found." });
    } catch (error) {
        return NextResponse.json(
            { message: "Error occured while getting your contact request." },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const reqBody: { id: string } = await request.json();
        const { id } = reqBody;
        const deletedContactRequest = await ContactRequest.findByIdAndDelete(
            id
        );
        if (!deletedContactRequest)
            return NextResponse.json(
                {
                    message: "Contact request not found.",
                },
                {
                    status: 404,
                }
            );
        else
            return NextResponse.json(
                {
                    message: "Contact request deleted successfully.",
                },
                {
                    status: 200,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while deleting your contact request.",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, ...updatedData } = reqBody;
        updatedData.name = updatedData.firstName + " " + updatedData.lastName;
        delete updatedData.firstName;
        delete updatedData.lastName;
        await ContactRequest.findOneAndUpdate(
            { _id },
            { $set: updatedData },
            { new: true }
        );
        return NextResponse.json(
            { message: "Contact Request updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while updating your contact request.",
            },
            {
                status: 500,
            }
        );
    }
}
