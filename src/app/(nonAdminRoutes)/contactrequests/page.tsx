"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContactRequest, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
export default function ContactRequests() {
    const [data, setdata] = useState<ContactRequest[]>();
    const [error, setError] = useState<boolean>(false);
    const getUserContactRequests = async () => {
        try {
            const res = await axios.get("/api/contactrequest");
            if (res.data.length > 0) setdata(res.data);
            else setdata([]);
        } catch (error) {
            console.log("Error", error);
            setError(true);
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
        <div className="p-2 md:px-10 md:py-5">
            <h1>My Contact Request(s)</h1>
            {data ? (
                <DataTable columns={columns} data={data} />
            ) : error ? (
                <h3>An error occurred</h3>
            ) : (
                <Skeleton className="w-full h-10" />
            )}
        </div>
    );
}
