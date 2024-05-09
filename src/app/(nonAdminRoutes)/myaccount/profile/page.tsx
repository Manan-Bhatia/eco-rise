"use client";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
    _id: z.string(),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username should be atleast 3 characters")
        .max(50, "Username should be less than 50 characters")
        .refine(
            (val) => {
                return /^[a-zA-Z0-9]+$/.test(val);
            },
            {
                message: "Username should only contain letters and numbers",
            }
        ),
    address: z.string(),
});
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function MyAccountProfile() {
    const [user, setUser] = useState<{
        id: string;
        email: string;
        username: string;
        address: string;
    }>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: "",
            email: "",
            username: "",
            address: "",
        },
    });
    useEffect(() => {
        if (user) {
            form.reset({
                _id: user.id,
                email: user.email,
                username: user.username,
                address: user.address,
            });
        }
    }, [user]);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.put("/api/account/update", values);
            toast.success(res.data.message, {
                duration: 2000,
                position: "bottom-center",
            });
        } catch (error: any) {
            if (error.response.data.email)
                form.setError("email", { message: error.response.data.email });
            if (error.response.data.username)
                form.setError("username", {
                    message: error.response.data.username,
                });
            if (!error.response.data.email && !error.response.data.username)
                toast.error(error.response.data.message, {
                    duration: 2000,
                    position: "bottom-center",
                });
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get("/api/getuser");
            setUser(response.data);
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
            <h1>My Account</h1>
            <Separator className="my-4" />
            {user ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Username"
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
                                            autoComplete="email"
                                            placeholder="Email"
                                            {...field}
                                        />
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
                                            placeholder="Enter your address"
                                            {...field}
                                            autoComplete="address-level1"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Save Changes</Button>
                    </form>
                </Form>
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
