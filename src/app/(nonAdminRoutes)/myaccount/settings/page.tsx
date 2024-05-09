"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    _id: z.string(),
    currentPassword: z.string().min(1, "Current password is required"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(5, "Password must have more than 5 characters")
        .refine(
            (val) => {
                return (
                    /[a-z]/.test(val) &&
                    /[A-Z]/.test(val) &&
                    /\d/.test(val) &&
                    /[!@#$%^&*]/.test(val)
                );
            },
            {
                message:
                    "Password must have at least 1 uppercase, 1 lowercase, 1 number and atleast 1 special character",
            }
        ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
});

export default function MyAccountSettings() {
    const [user, setUser] = useState<{
        id: string;
    }>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: "",
            password: "",
            confirmPassword: "",
        },
    });
    useEffect(() => {
        if (user) {
            form.reset({
                _id: user.id,
            });
        }
    }, [user]);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.put("/api/account/changepassword", values);
            toast.success(res.data.message, {
                duration: 2000,
                position: "bottom-center",
            });
        } catch (error: any) {
            if (error.response.data.currentPassword)
                form.setError("currentPassword", {
                    message: error.response.data.currentPassword,
                });
            if (!error.response.data.currentPassword)
                toast.error(error.response.data.message, {
                    duration: 2000,
                    position: "bottom-center",
                });
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get("/api/getuser");
            setUser({ id: response.data.id });
        } catch (error: any) {
            toast.error(error.response.data.message, {
                duration: 2000,
                position: "bottom-center",
            });
        }
    };
    let timeout: NodeJS.Timeout;
    useEffect(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            getUser();
        }, 100);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            <Toaster />
            <h1>Account Settings</h1>
            <Separator className="my-4" />

            <h2>Change Password</h2>
            {user ? (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Current Password"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Confirm New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm Password"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Save Changes</Button>
                        </form>
                    </Form>
                </>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="w-20 h-8" />
                        <Skeleton className="w-full h-10" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="w-20 h-8" />
                        <Skeleton className="w-full h-10" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="w-20 h-8" />
                        <Skeleton className="w-full h-10" />
                    </div>
                    <Skeleton className="w-20 h-8" />
                </div>
            )}
        </>
    );
}
