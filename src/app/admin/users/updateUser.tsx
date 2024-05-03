"use client";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const userSchema = z.object({
    role: z.enum(["admin", "user"]),
});
type ContactUsSchematype = z.infer<typeof userSchema>;
import { User } from "./columns";

export default function UpdateUser({
    user,
    callRefresh,
}: {
    user: User;
    callRefresh: () => void;
}) {
    const router = useRouter();
    const form = useForm<ContactUsSchematype>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: user.role,
        },
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    async function onSubmit(data: ContactUsSchematype) {
        try {
            setSubmitting(true);
            const response = await axios.put("/api/admin/user", {
                ...data,
                _id: user._id,
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
        <div className="">
            <div className="space-y-2">
                <Toaster />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="admin" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Admin
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="user" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    User
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
