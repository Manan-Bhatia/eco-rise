"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/logout");
            router.replace("/login");
        } catch (error) {
            console.log("Error in logout", error);
        }
    };

    return (
        <div>
            <h1>hello</h1>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
