"use client";
import { Calendar, Mail, Receipt, Users } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

import axios from "axios";
export default function Admin() {
    const [data, setData] = useState<{
        users: number;
        pendingEstimateRequests: number;
        pendingAppointments: number;
        pendingContactRequests: number;
    }>();
    const getData = async () => {
        try {
            const res = await axios.get("/api/admin");
            setData(res.data);
        } catch (error) {
            console.log("Error getting data", error);
        }
    };
    let timeout: NodeJS.Timeout;
    useEffect(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            getData();
        }, 200);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <Link href="/admin/users" className="flex-1">
                    <div className="rounded-lg border p-4 flex flex-col justify-center gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl md:text-3xl font-bold">
                                Users
                            </span>
                            <Users size={36} />
                        </div>
                        {data ? (
                            <span className="text-lg md:text-xl font-semibold">
                                {data.users} Users
                            </span>
                        ) : (
                            <Skeleton className="w-1/5 h-5" />
                        )}
                    </div>
                </Link>
                <Link className="flex-1" href="/admin/estimaterequests">
                    <div className="rounded-lg border p-4 flex flex-col justify-center  gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl md:text-3xl font-bold">
                                Estimate Request(s)
                            </span>
                            <Receipt size={36} />
                        </div>
                        <span className="text-lg md:text-xl font-semibold">
                            {data ? (
                                <span className="text-lg md:text-xl font-semibold">
                                    {data.pendingEstimateRequests} Pending
                                    Request(s)
                                </span>
                            ) : (
                                <Skeleton className="w-1/5 h-5" />
                            )}
                        </span>
                    </div>
                </Link>
                <Link className="flex-1" href="/admin/appointments">
                    <div className="rounded-lg border p-4 flex flex-col justify-center  gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl md:text-3xl font-bold">
                                Appointment(s)
                            </span>
                            <Calendar size={36} />
                        </div>
                        <span className="text-lg md:text-xl font-semibold">
                            {data ? (
                                <span className="text-lg md:text-xl font-semibold">
                                    {data.pendingAppointments} Pending
                                    Request(s)
                                </span>
                            ) : (
                                <Skeleton className="w-1/5 h-5" />
                            )}
                        </span>
                    </div>
                </Link>
                <Link className="flex-1" href="/admin/contactrequests">
                    <div className="rounded-lg border p-4 flex flex-col justify-center  gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl md:text-3xl font-bold">
                                Contact Request(s)
                            </span>
                            <Mail size={36} />
                        </div>
                        {data ? (
                            <span className="text-lg md:text-xl font-semibold">
                                {data.pendingContactRequests} Pending Request(s)
                            </span>
                        ) : (
                            <Skeleton className="w-1/5 h-5" />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
}
