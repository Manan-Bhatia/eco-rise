import type { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import NavBar from "@/components/Navbar";

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
        <>
            <NavBar />
            <main className="flex items-center justify-center h-full">
                <Card className="w-11/12 md:w-3/4 lg:w-1/3">
                    <CardHeader>
                        <CardTitle>Welcome to Eco Rise</CardTitle>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </main>
        </>
    );
}
