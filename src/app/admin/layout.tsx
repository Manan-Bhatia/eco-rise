export const metadata = {
    title: "Eco Rise",
    description: "Eco Rise",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="h-full md:px-10 md:py-5 p-4">{children}</main>;
}
