"use client";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { Contact, Calendar, LogOut, User, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const pathName = usePathname();
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/logout");
            setLoggedIn(false);
            router.replace("/login");
        } catch (error) {
            console.log("Error in logout", error);
        }
    };
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    let timeout: NodeJS.Timeout;
    useEffect(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            checkLoggedInStatus();
        }, 100);
        return () => clearTimeout(timeout);
    }, []);
    const [username, setUsername] = useState<string>("");
    const checkLoggedInStatus = async () => {
        try {
            const res = await axios.get("/api/getuser");
            if (res.status === 200) {
                setLoggedIn(true);
                setUsername(res.data.username);
            }
        } catch (error) {
            console.log(error);
            setLoggedIn(false);
        }
    };
    useEffect(() => {
        checkLoggedInStatus();
    }, [pathName]);
    return (
        <>
            <header className="flex justify-between p-2 md:px-10 md:py-5">
                <span className="text-2xl md:text-3xl font-bold">
                    Eco Rise - Admin Dashboard
                </span>
                <nav className="hidden md:flex items-center gap-2">
                    {loggedIn ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex gap-2 items-center"
                                    >
                                        <span className="text-lg">
                                            {username}
                                        </span>
                                        <FaRegCircleUser
                                            size={24}
                                            className="cursor-pointer"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/signup">
                                <Button>Signup</Button>
                            </Link>
                        </>
                    )}
                </nav>

                <HiMenuAlt3
                    size={36}
                    className="cursor-pointer md:hidden"
                    onClick={() => setMenuOpen(true)}
                />
                {/* backdrop */}
                <div
                    className={`bg-black/50 fixed inset-0 z-10 transition-opacity duration-300 md:hidden ${
                        menuOpen ? "opacity-100" : "invisible opacity-0"
                    }`}
                    onClick={() => setMenuOpen(false)}
                ></div>
                {/* mobile menu */}
                <nav
                    className={`fixed md:hidden z-50 top-0 w-3/4 h-full flex flex-col gap-3 bg-background p-4 transition-all duration-300 ${
                        menuOpen ? "right-0" : "-right-full"
                    }`}
                >
                    <div className="flex justify-end">
                        <IoClose
                            size={36}
                            className="cursor-pointer"
                            onClick={() => setMenuOpen(false)}
                        />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col gap-2">
                            {loggedIn ? (
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <main className="h-full md:px-10 md:py-5 p-4">{children}</main>;
        </>
    );
}
