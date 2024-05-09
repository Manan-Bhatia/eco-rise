import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/dbConfig";
connect();
export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, ...updatedData } = reqBody;
        // check if username and email are unique
        const res: {
            message: string;
            username?: string;
            email?: string;
        } = { message: "Error occured while updating Account." };
        if (await checkEmailAvaiability(_id, updatedData.email)) {
            res.email = "Email already in use";
        }
        if (await checkUsernameAvaiability(_id, updatedData.username)) {
            res.username = "Username already in use";
        }
        if (res.email || res.username)
            return NextResponse.json(res, { status: 400 });
        // checks passed - update account
        const updatedAccount = await User.findOneAndUpdate(
            { _id },
            { $set: updatedData },
            { new: true }
        );
        if (updatedAccount)
            return NextResponse.json(
                { message: "Account updated successfully" },
                { status: 200 }
            );
        else
            return NextResponse.json(
                {
                    message: "Error occured while updating Account.",
                },
                {
                    status: 500,
                }
            );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error occured while updating Account.",
                error: error,
            },
            {
                status: 500,
            }
        );
    }
}

const checkEmailAvaiability = async (
    id: string,
    email: string
): Promise<boolean> => {
    const user = await User.findOne({ _id: { $ne: id }, email });
    if (user) return true;
    else return false;
};

const checkUsernameAvaiability = async (
    id: string,
    username: string
): Promise<boolean> => {
    const user = await User.findOne({ _id: { $ne: id }, username });
    if (user) return true;
    else return false;
};
