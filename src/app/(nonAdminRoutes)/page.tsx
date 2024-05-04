"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FiveDayRoof from "/public/5dayroof.png";
import LifeTimePaint from "/public/lifetimepaint.png";
import Solar from "/public/solar.png";
import RoofCoating from "/public/roofcoating.png";
import Reviews from "/public/reviews.png";
import Home1 from "/public/home1.png";
import ProjectCompleted from "/public/projectcompleted.png";
import Happpy from "/public/happy.png";
import Partner from "/public/partners.png";
import Image from "next/image";
import Image1 from "/public/reviews/1.png";
import Image2 from "/public/reviews/2.png";
import Image3 from "/public/reviews/3.png";
import Image4 from "/public/reviews/4.png";
import Image5 from "/public/reviews/5.png";
import Image6 from "/public/reviews/6.png";
import Image7 from "/public/reviews/7.png";
import Image8 from "/public/reviews/8.png";
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
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import { MdEmail, MdCall } from "react-icons/md";
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
import EstimateRequestForm from "./estimateRequestForm";
import Home2 from "/public/home2.jpeg";

export default function Home() {
    const router = useRouter();

    return (
        <div className="h-full flex flex-col">
            {/* hero */}
            <div className="flex flex-col items-center justify-center basis-full relative p-5">
                <Image
                    src={Home2}
                    alt="Hero Image"
                    className="absolute h-full w-full object-cover z-10"
                />
                <div className="z-20">
                    <h1 className="text-center">
                        Exceeding Expectations Since 2009
                    </h1>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full">Get Estimate</Button>
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

                    <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-4">
                        <div className="aspect-square h-min p-4 border rounded-lg flex flex-col items-center justify-center bg-white/75">
                            <Image src={FiveDayRoof} alt={"5 Day Roof"} />
                            <h3>5 Day Roof</h3>
                        </div>
                        <div className="aspect-square h-min p-4 border rounded-lg flex flex-col items-center justify-center bg-white/75">
                            <Image
                                src={LifeTimePaint}
                                alt={"Life Time Paint"}
                            />
                            <h3>Life Time Paint</h3>
                        </div>
                        <div className="aspect-square h-min p-4 border rounded-lg flex flex-col items-center justify-center bg-white/75">
                            <Image src={Solar} alt={"Solar"} />
                            <h3>Solar</h3>
                        </div>
                        <div className="aspect-square h-min p-4 border rounded-lg flex flex-col items-center justify-center bg-white/75">
                            <Image
                                src={RoofCoating}
                                alt={"Roof Coating (Commercial)"}
                            />
                            <h3>Roof Coating</h3>
                            <h3>(Commercial)</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* reviews */}
            <div className="w-full bg-[#004924] text-white flex flex-col items-center justify-center py-4 gap-4">
                <h3 className="text-center">
                    "I highly recommend ECO for Roofing, Solar and Painting. 5 -
                    stars!"
                </h3>
                <span className="text-center">
                    - Sean L. | Los Angeles, California
                </span>
                <div className="w-11/12 md:w-2/5">
                    <Image src={Reviews} alt="Reviews" />
                </div>
            </div>
            {/* text */}
            <div className="flex flex-col gap-6 items-center justify-center py-5 md:py-10">
                <div className="flex flex-col lg:flex-row justify-between w-11/12 lg:w-3/4 xl:w-1/2 gap-6">
                    <Image src={Home1} alt="Home" className="basis-full" />
                    <div>
                        <h2>Residential / Commercial Services</h2>
                        <p>
                            Eco Rise operates as a Residential and Commercial
                            Contractor situated in Los Angeles.
                        </p>
                        <p>
                            Our focus lies in executing energy-efficient
                            initiatives, encompassing roofing, solar
                            installations, battery backup solutions, and paint
                            coatings. Rest assured, our team comprises skilled
                            and certified contractors and technicians dedicated
                            to delivering reliable workmanship.
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
            {/* Recent projects */}
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="relative flex justify-center before:content-[''] before:block before:w-1/4 before:h-1.5 before:bg-[#8ec740] before:absolute before:-bottom-2">
                    Recent Projects
                </h1>
            </div>
            {/* Our Reviews */}
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
                <div className="flex flex-col md:flex-row md:w-3/4 md:justify-between items-center gap-2">
                    <h3 className="text-center text-gray-600">
                        Low Interest clean energy loans.
                    </h3>
                    <h3 className="text-center text-gray-600">
                        $0 Down Financing
                    </h3>
                    <h3 className="text-center text-gray-600">
                        Traditional loans with no prepayment penalties
                    </h3>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-11/12 md:w-1/4">
                            Get Estimate
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Get Estimate</AlertDialogTitle>
                            <AlertDialogDescription>
                                Fill in the details and we'll get back to you
                                shortly!
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
            {/* contact */}
            <div className="mt-4 w-full bg-[#317f48] text-white flex items-center justify-center py-4 gap-10">
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
