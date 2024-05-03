"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import { User, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import DataTableSkeleton from "@/components/ui/data-table-skeleton";
import AddUser from "./addUser";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default function Users() {
    const [data, setData] = useState<User[]>();
    const [error, setError] = useState<boolean>(false);

    const getData = async () => {
        try {
            const res = await axios.get("/api/admin/user");
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
        <div className="space-y-4">
            <h1>Users</h1>
            {data ? (
                <DataTable columns={columns} data={data} />
            ) : error ? (
                <h3>An error occurred</h3>
            ) : (
                <DataTableSkeleton columns={5} />
            )}
            <Collapsible className="space-y-4">
                <CollapsibleTrigger>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-xl capitalize"
                    >
                        Add New User
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="border rounded-lg p-4 flex justify-center">
                        <AddUser callRefresh={getData} />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
