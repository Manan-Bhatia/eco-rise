import { NextRequest, NextResponse } from "next/server";
import getUserFromToken from "@/helpers/getUserFromToken";

import { connect } from "@/helpers/dbConfig";
connect();
export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromToken(request);
        if (user)
            return NextResponse.json(
                {
                    id: user._id,
                    username: user.username,
                },
                {
                    status: 200,
                }
            );
        else
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Error occured while fetching user data",
                error,
            },
            {
                status: 500,
            }
        );
    }
}
