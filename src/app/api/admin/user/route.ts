import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
    try {
        const users = await User.find();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error getting contact requests" },
            { status: 500 }
        );
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const reqBody: { id: string } = await request.json();
        const { id } = reqBody;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
            return NextResponse.json(
                {
                    message: "User not found.",
                },
                {
                    status: 404,
                }
            );
        else
            return NextResponse.json(
                {
                    message: "User deleted successfully.",
                },
                {
                    status: 200,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while deleting User",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, ...updatedData } = reqBody;
        await User.findOneAndUpdate(
            { _id },
            { $set: updatedData },
            { new: true }
        );
        return NextResponse.json(
            { message: "User updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while updating User.",
            },
            {
                status: 500,
            }
        );
    }
}
