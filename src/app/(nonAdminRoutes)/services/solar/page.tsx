import Image from "next/image";
import { MdEmail, MdCall } from "react-icons/md";
import Solar1 from "/public/solar1.jpg";
import Solar2 from "/public/solar2.jpg";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EstimateRequestForm from "../../estimateRequestForm";

export default function Solar() {
    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="w-full h-1/4 md:h-2/5 relative flex items-center justify-center">
                <Image
                    src={Solar1}
                    alt="Painting"
                    className="w-full h-full object-cover"
                />
                <div className="text-white flex flex-col gap-2 items-center absolute">
                    <h1>POWER YOUR HOME</h1>
                    <h2>WITH A SOLAR BATTERY SYSTEM</h2>
                    <h3 className="text-white">
                        Get in touch for a commitment free estimate
                    </h3>
                </div>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center py-5 md:py-10">
                <div className="flex flex-col items-center gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-center">
                        QUALITY SERVICE AND PRODUCTS
                    </h1>
                    <div className="justify-between flex flex-col md:flex-row items-center w-full">
                        <div className="flex flex-col items-center">
                            <h2>HONEST</h2>
                            <p>13 Years of Proven Integrity</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2>RELIABLE</h2>
                            <p>Consistent delivery on promises made</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2>KNOWLEDGABLE</h2>
                            <p>40+ Combined years of experience</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <div className="w-full">
                        <h1>SOLAR / BATTERY DESIGNED FOR YOUR NEEDS</h1>
                        <p>
                            Strategy and process are about setting yourself
                            apart from the competition. – Michael Porter
                        </p>
                        <p>
                            ECO’s success strategy comes from the deliberate
                            process of executing planning.
                        </p>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>Get Estimate</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Get Estimate
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Fill in the details and we'll get back
                                        to you shortly!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <EstimateRequestForm />
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="w-full">
                                        Cancel
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div>
                        <Image src={Solar1} alt="solar" />
                    </div>
                </div>
                <div className="flex flex-col items-center w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-center">
                        OUR SOLAR & BATTERY SERVICES
                    </h1>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h2>2 DAY SOLAR INSTALL & PROGRAM</h2>
                            <p>2 Days Done</p>
                            <p>Full Advance Review</p>
                            <p>We Manage All Permits / Inspections</p>
                            <p>No Hassles</p>
                            <p>25 Year Warranty</p>
                        </div>
                        <div>
                            <h2>3 DAY BATTERY WHOLE HOUSE BACK UP</h2>
                            <p>Lithium IRON Batteries</p>
                            <p>Safe – No Fire, No Puncture Explosion</p>
                            <p>Rated Energy 20kWh</p>
                            <p>No Hassles</p>
                            <p>On Grid / Off Grid Capability</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <div className="w-3/4">
                        <Image
                            src={Solar2}
                            alt="solar"
                            className="object-cover"
                        />
                    </div>

                    <div className="w-full">
                        <h1>SOLAR / BATTERY DESIGNED FOR YOUR NEEDS</h1>
                        <p>
                            Strategy and process are about setting yourself
                            apart from the competition. – Michael Porter
                        </p>
                        <p>
                            ECO’s success strategy comes from the deliberate
                            process of executing planning.
                        </p>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>Get Estimate</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Get Estimate
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Fill in the details and we'll get back
                                        to you shortly!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <EstimateRequestForm />
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="w-full">
                                        Cancel
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#317f48] text-white flex items-center justify-center py-4 gap-10">
                <div className="flex flex-col items-center justify-center">
                    <MdEmail size={36} />
                    <h3>Email</h3>
                    <span>ecorise@gmail.com</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <MdCall size={36} />
                    <h3>Call or Text</h3>
                    <span>123454323</span>
                    <span>24/7</span>
                </div>
            </div>
        </div>
    );
}
