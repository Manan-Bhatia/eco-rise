"use client";
import Image from "next/image";
import AboutUs from "../../../../public/aboutus.jpg";
import ProjectCompleted from "../../../../public/projectcompleted.png";
import Happpy from "../../../../public/happy.png";
import Partner from "../../../../public/partners.png";
import AboutUs2 from "../../../../public/aboutus2.jpg";
import AboutUs1 from "../../../../public/aboutus1.png";
import Contractor from "../../../../public/contractor.png";
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
import EstimateRequestForm from "../estimateRequestForm";
import Image1 from "../../../../public/reviews/1.png";
import Image2 from "../../../../public/reviews/2.png";
import Image3 from "../../../../public/reviews/3.png";
import Image4 from "../../../../public/reviews/4.png";
import Image5 from "../../../../public/reviews/5.png";
import Image6 from "../../../../public/reviews/6.png";
import Image7 from "../../../../public/reviews/7.png";
import Image8 from "../../../../public/reviews/8.png";
const imageArray = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
];
import { MdEmail, MdCall } from "react-icons/md";
import AutoPlay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function About() {
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="w-full h-1/4 md:h-2/5 relative flex items-center justify-center">
                <Image
                    src={AboutUs}
                    alt="About Us"
                    className="h-full object-cover"
                />
                <h1 className="absolute text-white">About Us</h1>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center py-5 md:py-10">
                <div className="grid md:grid-cols-2  w-11/12 lg:w-3/4 xl:w-1/2 gap-4">
                    <div>
                        <h2>
                            We remain dedicated to ensuring every client
                            receives a positive experience. Our transparent and
                            consultative methods are designed to cultivate
                            enduring relationships.
                        </h2>
                    </div>
                    <div>
                        <Image
                            src={AboutUs2}
                            alt="About us"
                            className="w-full object-cover"
                        />
                    </div>
                    <div>
                        <Image
                            src={AboutUs2}
                            alt="About us"
                            className="w-full object-cover"
                        />
                    </div>
                    <div>
                        <h2>RESIDENTIAL AND COMMERCIAL SERVICES</h2>
                        <p>
                            Eco Rise is a comprehensive Residential and
                            Commercial general contracting firm headquartered in
                            Los Angeles. Our expertise lies in energy-saving
                            endeavors, including roofing, solar installations,
                            battery backup systems, and paint coatings. Our
                            skilled and certified contractors and technicians
                            provide dependable workmanship you can rely on. Take
                            advantage of available rebates, tax credits, and
                            low-interest financing options.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                        <Image src={ProjectCompleted} alt="Project Completed" />
                        <div>
                            <h3>3500+</h3>
                            <span className="text-sm md:text-base text-gray-700">
                                Project Completed
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Image src={Happpy} alt="Happy Customers" />
                        <div>
                            <h3>100%</h3>
                            <span className="text-sm md:text-base text-gray-700">
                                Happy Clients
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Image src={Partner} alt="Handshake" />
                        <div>
                            <h3>369+</h3>
                            <span className="text-sm md:text-base text-gray-700">
                                Partners in our network
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-1/4 md:h-2/5 relative flex md:items-end justify-center">
                <Image
                    src={AboutUs1}
                    alt="About Us"
                    className="h-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3 items-center absolute w-full">
                    <h1 className="text-white text-center">
                        We are experts at all types of roofing system
                    </h1>
                    <div className="flex w-full md:flex-col justify-between items-center text-white">
                        <h2>Asphalt Shingle</h2>
                        <h2>Flat</h2>
                        <h2>Tile</h2>
                        <h2>Metal</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center py-5 md:py-10">
                <div className="w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1>Solar</h1>
                    <p>
                        Consultation / Site evaluation and energy use assessment
                        Plan, design, and permitting City Inspection
                        Installation / Activation We use the most advanced,
                        state-of-the-art equipment and skilled craftsmanship to
                        build systems that stand the test of time. 25 YEAR
                        performance warranty on solar panels.
                    </p>
                </div>
                <div className="w-11/12 lg:w-3/4 xl:w-1/2 flex h-min items-center">
                    <div>
                        <h1>How To Choose a Contractor</h1>
                        <p>
                            We stand behind our work, offering warranty
                            protection for both labor and materials.
                        </p>
                        <p>LICENSED / BONDED / INSURED</p>
                        <p>MANUFACTURER WARRANTIES</p>
                        <p>FAST RELIABLE SERVICE</p>
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
                    <div className="flex justify-center">
                        <Image
                            src={Contractor}
                            alt="contractor"
                            className="md:w-1/2 object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="relative flex justify-center before:content-[''] before:block before:w-1/4 before:h-1.5 before:bg-[#8ec740] before:absolute before:-bottom-2">
                    Our Reviews
                </h1>
                <h3 className="text-center">
                    Our range of lenders is selected to find the right solution
                    for you:
                </h3>
                <div className="flex items-center justify-center">
                    <Carousel
                        className="w-1/2 md:w-3/4"
                        opts={{
                            loop: true,
                            align: "center",
                        }}
                        plugins={[
                            AutoPlay({
                                delay: 2000,
                            }),
                        ]}
                    >
                        <CarouselPrevious />
                        <CarouselContent className=" -ml-2 md:-ml-4">
                            {imageArray.map((value, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-2 md:pl-4 basis-full md:basis-1/3 flex items-center justify-center"
                                >
                                    <Image
                                        src={value}
                                        alt={`Image${index + 1}`}
                                        className=" object-contain"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext />
                    </Carousel>
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
