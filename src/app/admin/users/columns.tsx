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
import UpdateUser from "./updateUser";

export type User = {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "user";
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue<string>("role");
            return (
                <Badge variant={`${role === "user" ? "secondary" : "default"}`}>
                    {row.getValue<string>("role").charAt(0).toUpperCase() +
                        row.getValue<string>("role").slice(1)}
                </Badge>
            );
        },
    },
    {
        id: "action",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
            const deleteUser = async (user: User) => {
                try {
                    const res = await axios.delete("/api/admin/user", {
                        data: {
                            id: user._id,
                        },
                    });
                    if (res.status === 200) window.location.reload();
                } catch (error) {
                    console.log("Error deleting contact request", error);
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
                                    onClick={() => deleteUser(user)}
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
                                <AlertDialogTitle>Edit Status</AlertDialogTitle>
                            </AlertDialogHeader>
                            <UpdateUser
                                user={user}
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
