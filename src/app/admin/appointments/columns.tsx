"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    ArrowUpDown,
    CircleHelp,
    CircleCheck,
} from "lucide-react";
import axios from "axios";
import UpdateAppointmentRequestForm from "./updateAppointmentRequest";

export type AppointmentRequest = {
    _id: string;
    user_id: string;
    service: "5 Day Roof" | "Paint" | "Solar" | "Roof Coating";
    appointmentDate: Date;
    appointmentTime: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    status: "pending" | "completed";
};

export const columns: ColumnDef<AppointmentRequest>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "service",
        header: "Service",
    },

    {
        accessorKey: "appointmentDate",
        header: "Appointment Date",
        enableColumnFilter: false,
        cell: ({ row }) => {
            const date = new Date(
                row.getValue<Date>("appointmentDate").toString()
            );
            return (
                <div>
                    {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </div>
            );
        },
    },
    {
        accessorKey: "appointmentTime",
        header: "Appointment Time",
        enableColumnFilter: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue<string>("status");
            return (
                <Badge
                    variant={`${
                        status === "pending" ? "secondary" : "default"
                    }`}
                    className="text-base flex gap-2 w-fit items-center"
                >
                    {status === "pending" ? (
                        <CircleHelp size={20} />
                    ) : (
                        <CircleCheck size={20} />
                    )}

                    {row.getValue<string>("status").charAt(0).toUpperCase() +
                        row.getValue<string>("status").slice(1)}
                </Badge>
            );
        },
    },
    {
        id: "action",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
            const appointmentRequest = row.original;
            const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
            const deleteAppointmentRequest = async (
                estimateReq: AppointmentRequest
            ) => {
                try {
                    const res = await axios.delete("/api/appointmentrequest", {
                        data: {
                            id: estimateReq._id,
                        },
                    });
                    if (res.status === 200) window.location.reload();
                } catch (error) {
                    console.log("Error deleting appointment request", error);
                }
            };
            const handleRefresh = () => {
                window.location.reload();
            };
            return (
                <AlertDialog
                    open={isEditDialogOpen || isDeleteDialogOpen}
                    onOpenChange={
                        isEditDialogOpen
                            ? setIsEditDialogOpen
                            : setIsDeleteDialogOpen
                    }
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => setIsDeleteDialogOpen(true)}
                            >
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setIsEditDialogOpen(true)}
                            >
                                Update
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* delete */}
                    {isDeleteDialogOpen && (
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        deleteAppointmentRequest(
                                            appointmentRequest
                                        )
                                    }
                                >
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    )}
                    {/* edit */}
                    {isEditDialogOpen && (
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Edit Details
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <UpdateAppointmentRequestForm
                                appointmentRequest={appointmentRequest}
                                callRefresh={handleRefresh}
                            />
                            <AlertDialogFooter>
                                <AlertDialogCancel className="w-full">
                                    Cancel
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    )}
                </AlertDialog>
            );
        },
    },
];
