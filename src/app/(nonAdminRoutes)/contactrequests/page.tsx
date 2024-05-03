"use client";
import axios from "axios";
import { useEffect } from "react";
export default function ContactRequests() {
    const getUserContactRequests = async () => {
        try {
            const res = await axios.get("/api/contactrequest");
            console.log(res);
        } catch (error) {
            console.log("Error", error);
        }
    };
    let timeout: NodeJS.Timeout;
    useEffect(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            getUserContactRequests();
        }, 200);
    }, []);
    return (
        <div>
            <h1>Contact Requests</h1>
        </div>
    );
}
