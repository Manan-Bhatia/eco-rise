import Image from "next/image";
import { MdEmail, MdCall } from "react-icons/md";
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
import Batterypic from "../../../../../public/battery.jpeg";
import Battery1 from "../../../../../public/battery1.png";
import Battery2 from "../../../../../public/battery2.png";
import Battery3 from "../../../../../public/battery3.png";
import BatteryCenter from "../../../../../public/batterycenter.png";
import BatteryGif from "../../../../../public/batterygif.gif";
import B1 from "../../../../../public/b1.png";
import B2 from "../../../../../public/b2.png";
import B3 from "../../../../../public/b3.png";
import B4 from "../../../../../public/b4.png";
import B5 from "../../../../../public/b5.png";

export default function Battery() {
    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="w-full h-1/4 md:h-2/5 relative flex items-center justify-center">
                <Image
                    src={Batterypic}
                    alt="Painting"
                    className="h-full w-full object-cover"
                />
                <div className="text-white flex flex-col gap-2 items-center absolute">
                    <h1>BLACKOUT BUNDLE</h1>
                    <h2>ELECTRICITY CONTROL STARTS HERE</h2>
                    <div className="hidden md:flex w-full items-center justify-between">
                        <div className="flex flex-col items-center gap-2">
                            <Image src={Battery1} alt="Solar" />
                            <p className="text-white">End Reliance</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Image src={Battery2} alt="Solar" />
                            <p className="text-white">Power Up</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Image src={Battery3} alt="Solar" />
                            <p className="text-white">Avoid Increases</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center py-5 md:py-10">
                <div className="flex flex-col md:flex-row gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-center w-full">
                        Control How and When You Use Your Energy
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-1/3 flex flex-col justify-between gap-4">
                            <div className="flex gap-2 justify-between ">
                                <div className="flex flex-col items-center">
                                    <h1>100%</h1>
                                    <h2 className="text-center">
                                        Self-Powered
                                    </h2>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h1>0%</h1>
                                    <h2 className="text-center">
                                        Utility Grid
                                    </h2>
                                </div>
                            </div>
                            <p>
                                Store the solar energy you produce during the
                                day and use it at night, protecting you from
                                higher utility costs
                            </p>
                        </div>
                        <div className="md:w-2/3">
                            <Image src={BatteryCenter} alt="solar" />
                        </div>
                        <div className="md:w-1/3 flex flex-col justify-between gap-4">
                            <div className="flex flex-col items-center">
                                <h1>365 Days</h1>
                                <h2 className="text-center">
                                    Continuous Power During Outages
                                </h2>
                            </div>
                            <p>
                                When the grid goes down, you will be able to
                                continue to power your home
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
                        <h1>Store Your Energy</h1>
                        <h1>Rated Energy: 20 kWh</h1>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <div>
                        <Image src={BatteryGif} alt="solar gif" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1>Built for Safety With Iron, Not Ion</h1>
                    <div className="grid md:grid-cols-2 gap-4 w-full">
                        <div className="flex gap-2 items-center">
                            <Image src={B1} alt="solar" />
                            <div>
                                <h2>
                                    Built with Lithium Iron Phosphate
                                    [LiFe(PO4)]
                                </h2>
                                <p>
                                    Longer-lasting and safer battery technology
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Image src={B2} alt="solar" />
                            <div>
                                <h2>
                                    Designed and built specifically for solar
                                    energy storage
                                </h2>
                                <p>
                                    Our batteries are designed for homes, not
                                    for cars
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Image src={B3} alt="solar" />
                            <div>
                                <h2>Built for Stability</h2>
                                <p>
                                    Non-toxic, with superior thermal and
                                    chemical stability
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Image src={B4} alt="solar" />
                            <div>
                                <h2>Higher Temperature Tolerance</h2>
                                <p>Under extreme heat, Iron outperforms Ion</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-center">24/7 Home Energy Monitoring</h1>
                    <Image src={B5} alt="solar" />
                    <h2>No Maintenance Costs</h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-center">Eligible for 30% Federal Tax Credit</h1>
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
                                    Fill in the details and we'll get back to
                                    you shortly!
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
