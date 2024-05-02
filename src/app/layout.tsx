import type { Metadata } from "next";
import { Inter as FontSanas } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/components/Navbar";

import "./globals.css";

const fontSans = FontSanas({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Eco Rise",
    description: "Eco Rise",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    " bg-background h-dvh font-sans antialiased p-1.5",
                    fontSans.variable
                )}
            >
                <NavBar />
                {children}
            </body>
        </html>
    );
}
