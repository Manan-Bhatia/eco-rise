"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type ContactRequest = {
    user_id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "pending" | "closed";
};

export const columns: ColumnDef<ContactRequest>[] = [
    {
        accessorKey: "name",
        header: "Full Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "subject",
        header: "Subject",
    },
    {
        accessorKey: "message",
        header: "Message",
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
];
