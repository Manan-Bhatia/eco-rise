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
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});
type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
    const router = useRouter();
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(data: LoginSchemaType) {
        try {
            const response = await axios.post("/api/login", data);
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
        }
    }
    return (
        <>
            <Toaster />
            <h1>Login</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
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
                                        autoComplete="current-password"
                                        {...field}
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
