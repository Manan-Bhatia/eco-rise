"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { EstimateRequest, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import DataTableSkeleton from "@/components/ui/data-table-skeleton";

export default function EstimateRequests() {
    const [data, setdata] = useState<EstimateRequest[]>();
    const [error, setError] = useState<boolean>(false);
    const getUserContactRequests = async () => {
        try {
            const res = await axios.get("/api/admin/estimaterequest");
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
            <h1>Estimate Requests</h1>
            {data ? (
                <DataTable columns={columns} data={data} />
            ) : error ? (
                <h3>An error occurred</h3>
            ) : (
                <DataTableSkeleton columns={6} />
            )}
        </div>
    );
}
