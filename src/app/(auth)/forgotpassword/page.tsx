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
import Link from "next/link";
import { useState } from "react";

const forgotSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
});
type ForgotSchemaType = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
    const router = useRouter();
    const form = useForm<ForgotSchemaType>({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            email: "",
        },
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    async function onSubmit(data: ForgotSchemaType) {
        try {
            setSubmitting(true);
            const response = await axios.post("/api/forgotpassword", data);
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
            <p>
                Enter your email address below, and we'll send you a link to
                reset your password.
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
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
            <div className="w-full flex justify-between items-start">
                <h4 className="text-base md:text-lg font-normal">
                    Remember Your Password?
                </h4>
                <Link
                    className="text-blue-500 text-sm md:text-base hover:underline whitespace-nowrap"
                    href="/login"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
