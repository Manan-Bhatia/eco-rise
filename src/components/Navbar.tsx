"use client";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const pathName = usePathname();
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/logout");
            router.replace("/login");
        } catch (error) {
            console.log("Error in logout", error);
        }
    };

    return (
        <header className="flex justify-between">
            <span className="text-2xl md:text-3xl font-bold">Eco Rise</span>
            <nav className="hidden md:block">
                <ul className="flex gap-4 items-center">
                    <li>
                        <Link
                            href="/"
                            className={
                                "p-2 relative group flex flex-col items-center " +
                                (pathName === "/" ? "active" : "")
                            }
                        >
                            Home
                            <span
                                className={`absolute w-full h-1 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 bg-[#004924] ${
                                    pathName === "/" ? "hidden" : ""
                                }`}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={
                                "p-2 relative group flex flex-col items-center " +
                                (pathName === "/about" ? "active" : "")
                            }
                        >
                            About us
                            <span
                                className={`absolute w-full h-1 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 bg-[#004924] ${
                                    pathName === "/about" ? "hidden" : ""
                                }`}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/services"
                            className={
                                "p-2 relative group flex flex-col items-center " +
                                (pathName === "/services" ? "active" : "")
                            }
                        >
                            Services
                            <span
                                className={`absolute w-full h-1 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 bg-[#004924] ${
                                    pathName === "/services" ? "hidden" : ""
                                }`}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/bookappointment"
                            className={
                                "p-2 relative group flex flex-col items-center " +
                                (pathName === "/bookappointment"
                                    ? "active"
                                    : "")
                            }
                        >
                            Book Appointment
                            <span
                                className={`absolute w-full h-1 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 bg-[#004924] ${
                                    pathName === "/bookappointment"
                                        ? "hidden"
                                        : ""
                                }`}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/gallery"
                            className={
                                "p-2 relative group flex flex-col items-center " +
                                (pathName === "/gallery" ? "active" : "")
                            }
                        >
                            Gallery
                            <span
                                className={`absolute w-full h-1 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 bg-[#004924] ${
                                    pathName === "/gallery" ? "hidden" : ""
                                }
                            `}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={
                                "p-2 relative group flex flex-col items-center " +
                                (pathName === "/contact" ? "active" : "")
                            }
                        >
                            Contact us
                            <span
                                className={`absolute w-full h-1 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 bg-[#004924] ${
                                    pathName === "/contact" ? "hidden" : ""
                                }`}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Button onClick={logout}>Logout</Button>
                    </li>
                    <li>
                        <Link href="/signup">
                            <Button>Signup</Button>
                        </Link>
                    </li>
                </ul>
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
                    <ul className="space-y-4">
                        <li>
                            <Link
                                onClick={() => setMenuOpen(false)}
                                href="/"
                                className={
                                    "py-1 " + (pathName === "/" ? "active" : "")
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setMenuOpen(false)}
                                href="/about"
                                className={
                                    "py-1 " +
                                    (pathName === "/about" ? "active" : "")
                                }
                            >
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setMenuOpen(false)}
                                href="/services"
                                className={
                                    "py-1 " +
                                    (pathName === "/services" ? "active" : "")
                                }
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setMenuOpen(false)}
                                href="/bookappointment"
                                className={
                                    "py-1 " +
                                    (pathName === "/bookappointment"
                                        ? "active"
                                        : "")
                                }
                            >
                                Book Appointment
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setMenuOpen(false)}
                                href="/gallery"
                                className={
                                    "py-1 " +
                                    (pathName === "/gallery" ? "active" : "")
                                }
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setMenuOpen(false)}
                                href="/contact"
                                className={
                                    "py-1 " +
                                    (pathName === "/contact" ? "active" : "")
                                }
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="flex flex-col gap-2">
                        <Link href="/login" onClick={() => setMenuOpen(false)}>
                            <Button className="w-full" variant="secondary">
                                Login
                            </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setMenuOpen(false)}>
                            <Button className="w-full">Signup</Button>
                        </Link>
                        <Button
                            className="w-full"
                            onClick={() => {
                                logout();
                                setMenuOpen(false);
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
