"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ContactRequest, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import DataTableSkeleton from "@/components/ui/data-table-skeleton";
export default function ContactRequests() {
    const [data, setData] = useState<ContactRequest[]>();
    const [error, setError] = useState<boolean>(false);
    const getData = async () => {
        try {
            const res = await axios.get("/api/admin/contactrequest");
            setData(res.data);
        } catch (error) {
            console.log("Error getting data", error);
            setError(true);
        }
    };
    let timeout: NodeJS.Timeout;
    useEffect(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            getData();
        }, 200);
    }, []);
    return (
        <div>
            <h1>Contact Requests</h1>
            {data ? (
                <DataTable columns={columns} data={data} />
            ) : error ? (
                <h3>An error occurred</h3>
            ) : (
                <DataTableSkeleton columns={5} />
            )}
        </div>
    );
}
