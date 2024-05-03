import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function verifyAdminStatusFromToken(
    request: NextRequest
): Promise<boolean> {
    try {
        const adminToken: string =
            request.cookies.get("adminToken")?.value || "";
        if (adminToken) {
            try {
                await jwtVerify(
                    adminToken,
                    new TextEncoder().encode(process.env.TOKEN_SECRET!)
                );
                return true;
            } catch (error) {
                return false;
            }
        } else return false;
    } catch (error) {
        return false;
    }
}
