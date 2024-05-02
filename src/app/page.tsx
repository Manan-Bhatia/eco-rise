"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
    const router = useRouter();

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}
