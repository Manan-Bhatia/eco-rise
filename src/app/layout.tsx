import type { Metadata } from "next";
import { Inter as FontSanas } from "next/font/google";
import { cn } from "@/lib/utils";

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
                    " bg-background h-dvh font-sans antialiased",
                    fontSans.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}
