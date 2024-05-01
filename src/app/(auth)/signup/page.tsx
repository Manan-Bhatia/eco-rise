"use client";
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
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const signUpSchema = z
    .object({
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
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function Signup() {
    const router = useRouter();
    const form = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });
    async function onSubmit(data: SignUpSchemaType) {
        try {
            const response = await axios.post("/api/signup", data);
            if (response.status === 201) {
                toast.success(response.data.message, {
                    duration: 2000,
                    position: "bottom-center",
                });
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error: any) {
            toast.error(error.response.data.message, {
                duration: 2000,
                position: "bottom-center",
            });
        }
    }
    return (
        <>
            <Toaster />
            <h1>Signup</h1>
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
                                        autoComplete="username"
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        {...field}
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
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        {...field}
                                        autoComplete="new-password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    );
}
