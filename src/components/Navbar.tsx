"use client";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
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
export default function NavBar() {
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
    const [myAccountMobileNavOpen, setMyAccountMobileNavOpen] =
        useState<boolean>(false);

    const [servicesMobileNavOpen, setServicesMovileNavOpen] =
        useState<boolean>(false);
    return (
        <header className="flex justify-between p-2 md:px-10 md:py-5">
            <span className="text-2xl md:text-3xl font-bold">Eco Rise</span>
            <nav className="hidden md:flex items-center gap-2">
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
                    <li className="group relative">
                        <div
                            className={
                                "p-2 relative flex flex-col items-center cursor-pointer " +
                                (pathName === "/services" ? "active" : "")
                            }
                        >
                            Services
                            <span
                                className={`absolute w-full h-1 bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 bg-[#004924] ${
                                    pathName === "/services" ? "hidden" : ""
                                }`}
                            ></span>
                        </div>
                        <div
                            className={`absolute flex-col top-full gap-2 hidden group-hover:flex w-full z-50 bg-white`}
                        >
                            <Link
                                href="/services/paint"
                                className="hover:bg-black hover:text-white p-2"
                            >
                                Paint
                            </Link>
                            <Link
                                href="/services/solar"
                                className="hover:bg-black hover:text-white p-2"
                            >
                                Solar
                            </Link>
                            <Link
                                href="/services/battery"
                                className="hover:bg-black hover:text-white p-2"
                            >
                                Battery
                            </Link>
                        </div>
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
                </ul>
                {loggedIn ? (
                    <>
                        {/* <Button onClick={logout}>Logout</Button> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex gap-2 items-center"
                                >
                                    <span className="text-lg">{username}</span>
                                    <FaRegCircleUser
                                        size={24}
                                        className="cursor-pointer"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/estimaterequests"
                                            className="flex"
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Estimate Requests</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/appointmentrequests"
                                            className="flex"
                                        >
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>Appointments</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="flex"
                                            href="/contactrequests"
                                        >
                                            <Contact className="mr-2 h-4 w-4" />
                                            <span>Contact Requests</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
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
                        <li
                            className={`flex flex-col gap-2 relative cursor-pointer`}
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() =>
                                    setServicesMovileNavOpen(
                                        !servicesMobileNavOpen
                                    )
                                }
                            >
                                <span>Services</span>
                                <ChevronDown
                                    size={24}
                                    className={`rotate-0 ${
                                        servicesMobileNavOpen
                                            ? "rotate-180"
                                            : ""
                                    } duration-200 transition-all`}
                                />
                            </div>
                            <div
                                className={`flex flex-col gap-4 pl-4 border-l-2 border-l-[#004924] ${
                                    servicesMobileNavOpen ? "" : "hidden"
                                }`}
                            >
                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    className={
                                        "py-1 " +
                                        (pathName === "/services/paint"
                                            ? "active w-fit"
                                            : "")
                                    }
                                    href="/services/paint"
                                >
                                    Paint
                                </Link>
                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    className={
                                        "py-1 " +
                                        (pathName === "/services/solar"
                                            ? "active w-fit"
                                            : "")
                                    }
                                    href="/services/solar"
                                >
                                    Solar
                                </Link>
                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    className={
                                        "py-1 " +
                                        (pathName === "/services/battery"
                                            ? "active w-fit"
                                            : "")
                                    }
                                    href="/services/battery"
                                >
                                    Battery
                                </Link>
                            </div>
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
                        <li
                            className={`flex flex-col gap-2 relative cursor-pointer`}
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() =>
                                    setMyAccountMobileNavOpen(
                                        !myAccountMobileNavOpen
                                    )
                                }
                            >
                                <span>My Account</span>
                                <ChevronDown
                                    size={24}
                                    className={`rotate-0 ${
                                        myAccountMobileNavOpen
                                            ? "rotate-180"
                                            : ""
                                    } duration-200 transition-all`}
                                />
                            </div>
                            <div
                                className={`flex flex-col gap-4 pl-4 border-l-2 border-l-[#004924] transition-all duration-200 origin-top ${
                                    myAccountMobileNavOpen
                                        ? "scale-y-100"
                                        : "scale-y-0"
                                }`}
                            >
                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    className={
                                        "py-1 " +
                                        (pathName === "/estimaterequests"
                                            ? "active w-fit"
                                            : "")
                                    }
                                    href="/estimaterequests"
                                >
                                    Estimate Requests
                                </Link>
                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    className={
                                        "py-1 " +
                                        (pathName === "/appointmentrequests"
                                            ? "active w-fit"
                                            : "")
                                    }
                                    href="/appointmentrequests"
                                >
                                    Appointments
                                </Link>
                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    className={
                                        "py-1 " +
                                        (pathName === "/contactrequests"
                                            ? "active w-fit"
                                            : "")
                                    }
                                    href="/contactrequests"
                                >
                                    Contact Requests
                                </Link>
                            </div>
                        </li>
                    </ul>
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
                                <Link
                                    href="/signup"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Button className="w-full">Signup</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
