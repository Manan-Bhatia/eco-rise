"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AppointmentRequest, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import DataTableSkeleton from "@/components/ui/data-table-skeleton";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AddAppointment from "./addAppointment";

export default function Appointments() {
    const [data, setdata] = useState<AppointmentRequest[]>();
    const [error, setError] = useState<boolean>(false);
    const getAllAppointmentRequests = async () => {
        try {
            const res = await axios.get("/api/admin/appointmentrequest");
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
            getAllAppointmentRequests();
        }, 200);
    }, []);

    return (
        <div className="p-2 md:px-10 md:py-5">
            <h1>My Appointment</h1>
            {data ? (
                <DataTable columns={columns} data={data} />
            ) : error ? (
                <h3>An error occurred</h3>
            ) : (
                <DataTableSkeleton columns={8} />
            )}
            <Collapsible className="space-y-4">
                <CollapsibleTrigger>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-xl capitalize"
                    >
                        Add New Appointment
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="border rounded-lg p-4 flex justify-center">
                        <AddAppointment
                            callRefresh={getAllAppointmentRequests}
                        />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
