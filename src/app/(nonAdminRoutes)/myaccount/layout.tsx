"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { TbUserEdit } from "react-icons/tb";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();
    return (
        <>
            <section className="flex flex-col items-center h-full ">
                <div className="flex gap-4 w-4/5 lg:w-3/4 xl:w-1/2 p-4 border rounded-lg">
                    <aside className="w-1/5 flex flex-col gap-2">
                        <div
                            className={`flex w-full items-center gap-2 rounded-s-md py-1 ${
                                pathName === "/myaccount/profile" &&
                                "bg-blue-100/50 border-r-blue-500 border-r-2"
                            }`}
                        >
                            <TbUserEdit size={30} />
                            <Link href="/myaccount/profile">
                                <h3>Profile</h3>
                            </Link>
                        </div>
                        <div
                            className={`flex w-full items-center gap-2 rounded-s-md py-1 ${
                                pathName === "/myaccount/settings" &&
                                "bg-blue-100/50 border-r-blue-500 border-r-2"
                            }`}
                        >
                            <Settings size={30} />
                            <Link href="/myaccount/settings">
                                <h3>Account</h3>
                            </Link>
                        </div>
                    </aside>
                    <Separator orientation="vertical" />
                    <article className="w-3/4">{children}</article>
                </div>
            </section>
        </>
    );
}
