"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { EstimateRequest } from "./columns";

const services = ["5 Day Roof", "Paint", "Solar", "Roof Coating"];
const estimateRequestSchema = z.object({
    status: z.enum(["pending", "closed"]),
});
type EstimateRequestType = z.infer<typeof estimateRequestSchema>;

export default function UpdateEstimateRequestForm({
    estimateRequest,
    callRefresh,
}: {
    estimateRequest: EstimateRequest;
    callRefresh: () => void;
}) {
    const form = useForm<EstimateRequestType>({
        resolver: zodResolver(estimateRequestSchema),
        defaultValues: {
            status: estimateRequest.status,
        },
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    async function onSubmit(data: EstimateRequestType) {
        console.log(data);
        try {
            setSubmitting(true);
            const response = await axios.put("/api/estimaterequest", {
                ...data,
                _id: estimateRequest._id,
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
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="pending" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Pending
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="closed" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Closed
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
