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
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import axios from "axios";
import UpdateEstimateRequestForm from "./updateEstimateRequest";

export type EstimateRequest = {
    _id: string;
    user_id: string;
    service: "5 Day Roof" | "Paint" | "Solar" | "Roof Coating";
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    status: "pending" | "closed";
};

export const columns: ColumnDef<EstimateRequest>[] = [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue<string>("status");
            return (
                <Badge
                    variant={`${
                        status === "pending" ? "secondary" : "default"
                    }`}
                >
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
            const estimateRequest = row.original;
            const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
            const deleteContactRequest = async (
                estimateReq: EstimateRequest
            ) => {
                try {
                    const res = await axios.delete("/api/estimaterequest", {
                        data: {
                            id: estimateReq._id,
                        },
                    });
                    if (res.status === 200) window.location.reload();
                } catch (error) {
                    console.log("Error deleting estimate request", error);
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
                                        deleteContactRequest(estimateRequest)
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
                            <UpdateEstimateRequestForm
                                estimateRequest={estimateRequest}
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
