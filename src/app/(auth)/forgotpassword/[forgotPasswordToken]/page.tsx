"use client";
import { Loader2 } from "lucide-react";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

const forgotSchema = z
    .object({
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
        forgotPasswordToken: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
type ForgotSchemaType = z.infer<typeof forgotSchema>;

export default function ForgotPassword({
    params,
}: {
    params: {
        forgotPasswordToken: string;
    };
}) {
    const router = useRouter();
    const form = useForm<ForgotSchemaType>({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            forgotPasswordToken:
                decodeURIComponent(params.forgotPasswordToken) || "",
        },
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    async function onSubmit(data: ForgotSchemaType) {
        try {
            setSubmitting(true);
            const response = await axios.put("/api/forgotpassword", data);
            if (response.status === 200) {
                toast.success(response.data.message, {
                    duration: 2000,
                    position: "bottom-center",
                });
                setTimeout(() => {
                    router.replace("/");
                }, 2000);
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
        <div className="space-y-2">
            <Toaster />
            <h1>Reset Password</h1>
            <p>Enter your new password below to reset your password.</p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
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
    );
}
