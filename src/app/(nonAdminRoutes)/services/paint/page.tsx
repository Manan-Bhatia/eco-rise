import Image from "next/image";
import { MdEmail, MdCall } from "react-icons/md";
import Painting from "/public/paint.png";
import Aboutus1 from "/public/aboutus2.jpg";
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
import Paint1 from "/public/paint1.png";
import Paint2 from "/public/paint2.png";
import Paint3 from "/public/paint3.png";
import Paint4 from "/public/paint4.png";
export default function Paint() {
    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="w-full h-1/4 md:h-2/5 relative flex items-center justify-center">
                <Image
                    src={Painting}
                    alt="Painting"
                    className="h-full w-full object-cover"
                />
                <h1 className="absolute text-white">Painting</h1>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center py-5 md:py-10">
                <div className="flex flex-col md:flex-row gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <div>
                        <Image src={Aboutus1} alt="paint" />
                    </div>
                    <div>
                        <h1>Painting with ECO</h1>

                        <p>
                            We perform high-quality interior and exterior
                            painting for all types of Residential and Commercial
                            buildings. ECO Rise is a General Contractor with
                            over 13 years of experience serving Los Angeles and
                            the surrounding areas. We are Licensed, Bonded, and
                            insured
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
                <div className="w-11/12 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-center">Exterior Painting Services</h1>
                    <p>
                        Wind and sunny weather can erode your Los Angeles home’s
                        exterior paint in a hurry. ECO RISE uses high-quality
                        thermal paints to provide a long lasting, waterproof
                        finish with a heat reflective component. Our exceptional
                        workmanship is guaranteed for life.
                    </p>
                    <h2>
                        At ECO RISE, we recommend LifePaint™ instead of regular
                        paint. Unlike standard exterior paint, LifePaint™
                        provides a variety of benefits:
                    </h2>
                </div>
                <div className="grid md:grid-cols-2  gap-4 w-11/12 lg:w-3/4 xl:w-1/2">
                    <div className="flex items-start gap-2">
                        <Image src={Paint1} alt="paint" />
                        <div>
                            <h2>Significantly thicker than regular paint</h2>
                            <p>
                                it reflects the sun’s intense ultraviolet rays.
                                This innovative paint solution is a “sunscreen”
                                to protect your home’s exterior from fading over
                                time.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Image src={Paint2} alt="paint" />
                        <div>
                            <h2>
                                The elasticity of LifePaint™ is guaranteed
                                against manufacturing defects
                            </h2>
                            <p>
                                Manufacturing defects may cause premature
                                fading, chipping, peeling, or cracking.
                                Homeowners have less long-term maintenance and
                                upkeep.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Image src={Paint3} alt="paint" />
                        <div>
                            <h2>
                                LifePaint™ extends the life of your home’s
                                exterior color
                            </h2>
                            <p>
                                by insulating your home from harmful UV rays
                                that are reflected so your home stays cooler.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Image src={Paint4} alt="paint" />
                        <div>
                            <h2>LifePaint™ Lifetime Warranty</h2>
                            <p>
                                The lifetime warranty supports your home’s
                                beauty with lifetime protection.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center w-11/12 lg:w-3/4 xl:w-1/2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-1/2">Get Estimate</Button>
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
                    <p>
                        LifePaint™ provides many benefits to homeowners and
                        building owners. To qualify for the Lifetime warranty,
                        all work must be done by trained and certified
                        technicians. ECO RISE is a Certified Contractor with
                        Life Specialty Coatings, the manufacturer of LifePaint™.
                        (Detailed warranty information available upon request)
                    </p>
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
