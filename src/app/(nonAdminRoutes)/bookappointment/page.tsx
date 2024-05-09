"use client";
import { cn } from "@/lib/utils";
import { format, addBusinessDays } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const services = ["5 Day Roof", "Paint", "Solar", "Roof Coating"];
const bookAppointmentSchema = z.object({
    service: z.enum(["5 Day Roof", "Paint", "Solar", "Roof Coating"]),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    address: z.string(),
    appointmentDate: z.date(),
    appointmentTime: z.string(),
});
type BookAppointSchemaType = z.infer<typeof bookAppointmentSchema>;

export default function BookAppointment() {
    const [userAddress, setUserAddress] = useState<string>("");
    const getUserAddress = async () => {
        try {
            const res = await axios.get("/api/getuser");
            if (res.data.address != "") setUserAddress(res.data.address);
        } catch (error) {
            console.log("Error getting user address", error);
        }
    };

    let timeout: NodeJS.Timeout;
    useEffect(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            getUserAddress();
        }, 100);
        return () => clearTimeout(timeout);
    }, []);
    const router = useRouter();
    const form = useForm<BookAppointSchemaType>({
        resolver: zodResolver(bookAppointmentSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            appointmentTime: "",
        },
    });
    useEffect(() => {
        if (userAddress) form.reset({ address: userAddress });
    }, [userAddress]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    async function onSubmit(data: BookAppointSchemaType) {
        try {
            setSubmitting(true);
            const response = await axios.post("/api/appointmentrequest", data);
            if (response.status === 201) {
                toast.success(response.data.message, {
                    duration: 2000,
                    position: "bottom-center",
                });
            }
        } catch (error: any) {
            toast.error(error.response.data.message, {
                duration: 2000,
                position: "bottom-center",
            });
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <div className="flex items-center justify-center h-full">
            <div className="space-y-2">
                <Toaster />
                <h1>Book an appointment</h1>
                <p>
                    Fill in the details and we'll get in touch with you shortly!
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a service" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {services.map((service) => (
                                                <SelectItem
                                                    key={service}
                                                    value={service}
                                                >
                                                    {service}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="appointmentDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Appointment Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="center"
                                        >
                                            <Select
                                                onValueChange={(value) =>
                                                    field.onChange(
                                                        addBusinessDays(
                                                            new Date(),
                                                            parseInt(value)
                                                        )
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    <SelectItem value="0">
                                                        Today
                                                    </SelectItem>
                                                    <SelectItem value="1">
                                                        Tomorrow
                                                    </SelectItem>
                                                    <SelectItem value="3">
                                                        In 3 days
                                                    </SelectItem>
                                                    <SelectItem value="7">
                                                        In a week
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date: Date) => {
                                                    return (
                                                        date <
                                                            addBusinessDays(
                                                                new Date(),
                                                                -1
                                                            ) ||
                                                        date.getDay() === 0 ||
                                                        date.getDay() === 6
                                                    );
                                                }}
                                                weekStartsOn={1}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="appointmentTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Appointment Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            placeholder="Appointment Time"
                                            {...field}
                                            min="09:00"
                                            max="18:00"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Office hours are between 9:00 AM and
                                        6:00 PM
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Address"
                                            {...field}
                                        />
                                    </FormControl>
                                    {userAddress != "" && (
                                        <FormDescription>
                                            *Saved Address
                                        </FormDescription>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Phone Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            {...field}
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 w-4 animate-spin" />
                                    <span>Please wait</span>
                                </>
                            ) : (
                                <span>Submit</span>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
