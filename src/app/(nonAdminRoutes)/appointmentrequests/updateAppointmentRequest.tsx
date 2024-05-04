"use client";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { z } from "zod";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

const services = ["5 Day Roof", "Paint", "Solar", "Roof Coating"];
const appointmentRequestSchema = z.object({
    service: z.enum(["5 Day Roof", "Paint", "Solar", "Roof Coating"]),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    address: z.string(),
    appointmentDate: z.date(),
    appointmentTime: z.string(),
});

type AppointmentRequestType = z.infer<typeof appointmentRequestSchema>;
import { AppointmentRequest } from "./columns";

export default function UpdateAppointmentRequestForm({
    appointmentRequest,
    callRefresh,
}: {
    appointmentRequest: AppointmentRequest;
    callRefresh: () => void;
}) {
    const form = useForm<AppointmentRequestType>({
        resolver: zodResolver(appointmentRequestSchema),
        defaultValues: {
            service: appointmentRequest.service,
            name: appointmentRequest.name,
            address: appointmentRequest.address,
            phoneNumber: appointmentRequest.phoneNumber,
            email: appointmentRequest.email,
            appointmentDate: new Date(appointmentRequest.appointmentDate),
            appointmentTime: appointmentRequest.appointmentTime,
        },
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    async function onSubmit(data: AppointmentRequestType) {
        try {
            setSubmitting(true);
            const response = await axios.put("/api/appointmentrequest", {
                ...data,
                _id: appointmentRequest._id,
            });
            if (response.status === 200) {
                toast.success(response.data.message, {
                    duration: 2000,
                    position: "bottom-center",
                });
                callRefresh();
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
        <div>
            <div className="space-y-2">
                <Toaster />
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
                                                        addDays(
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
                                                disabled={(date: Date) =>
                                                    date <
                                                    addDays(new Date(), -1)
                                                }
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
                                        />
                                    </FormControl>
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
