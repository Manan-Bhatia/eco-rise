import NavBar from "@/components/Navbar";
export const metadata = {
    title: "Eco Rise",
    description: "Eco Rise",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBar />
            <main className="h-full">{children}</main>
        </>
    );
}
