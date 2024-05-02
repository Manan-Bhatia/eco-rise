import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const publicPaths = ["/login", "/signup"];
const adminPaths = ["/admin"];
export async function middleware(request: NextRequest) {
    const path: string = request.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(path);
    const isAdminPath = adminPaths.includes(path);
    const token: string = request.cookies.get("token")?.value || "";
    const adminToken: string = request.cookies.get("adminToken")?.value || "";
    let tokenValid: boolean = false;
    let adminTokenValid: boolean = false;

    if (token) {
        try {
            await jwtVerify(
                token,
                new TextEncoder().encode(process.env.TOKEN_SECRET!)
            );
            tokenValid = true;
        } catch (error) {
            request.cookies.delete("token");
        }
    }
    if (adminToken) {
        try {
            await jwtVerify(
                adminToken,
                new TextEncoder().encode(process.env.TOKEN_SECRET!)
            );
            adminTokenValid = true;
        } catch (error) {
            request.cookies.delete("adminToken");
        }
    }

    if (isPublicPath) {
        if (tokenValid) {
            const response = NextResponse.redirect(
                new URL("/", request.nextUrl)
            );
            return response;
        }
    } else {
        if (!tokenValid) {
            const response = NextResponse.redirect(
                new URL("/login", request.nextUrl)
            );
            response.cookies.set("token", "", { expires: new Date(0) });
            return response;
        } else if (isAdminPath) {
            if (!adminTokenValid) {
                const response = NextResponse.redirect(
                    new URL("/admin/login", request.nextUrl)
                );
                response.cookies.set("adminToken", "", {
                    expires: new Date(0),
                });
                return response;
            }
        } else return;
    }
}

export const config = {
    matcher: ["/login", "/signup", "/admin/:path*"],
};
