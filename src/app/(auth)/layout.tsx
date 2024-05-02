import type { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Eco Rise",
    description: "Eco Rise",
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex items-center justify-center h-full">
            <Card className="w-11/12 md:w-3/4 lg:w-1/3">
                <CardHeader>
                    <CardTitle>Welcome to Eco Rise</CardTitle>
                    <CardDescription className="text-base">
                        Join Eco Rise and elevate your space with sustainable
                        solutions. Sign up today to make every project a beacon
                        of eco-friendly innovation!
                    </CardDescription>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </main>
    );
}
