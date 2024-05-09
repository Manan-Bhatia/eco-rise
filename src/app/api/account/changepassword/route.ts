import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/dbConfig";
connect();
import bcryptjs from "bcryptjs";
export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, ...updatedData } = reqBody;
        // find user with given id
        const user = await User.findOne({ _id });
        if (!user) {
            return NextResponse.json(
                { message: "Error finding user" },
                { status: 400 }
            );
        }
        const isPasswordCorrect = await bcryptjs.compare(
            updatedData.currentPassword,
            user.password
        );
        // if password is not correct, return error
        if (!isPasswordCorrect) {
            return NextResponse.json(
                {
                    message: "Error checking current password",
                    currentPassword: "Password provided is incorrect",
                },
                { status: 400 }
            );
        } else if (updatedData.password !== updatedData.confirmPassword) {
            return NextResponse.json(
                {
                    message: "Passwords do not match",
                },
                { status: 400 }
            );
        } else {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(
                updatedData.password,
                salt
            );
            updatedData.password = hashedPassword;
        }
        const updatedAccount = await User.findOneAndUpdate(
            { _id },
            { password: updatedData.password },
            { new: true }
        );
        if (updatedAccount)
            return NextResponse.json(
                { message: "Password Changed successfully" },
                { status: 200 }
            );
        else
            return NextResponse.json(
                {
                    message: "Error occured while changing password.",
                },
                {
                    status: 500,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while changing password.",
                error: error,
            },
            {
                status: 500,
            }
        );
    }
}
