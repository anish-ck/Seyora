"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type TouristColumn = {
  useremail: string;
  place: string;
  timeLeft: string;
  numberOfDays: string;
  status: "ACTIVE" | "CLOSE";
};
export const Column: ColumnDef<TouristColumn>[] = [
  {
    accessorKey: "useremail",
    header: "user Email",
  },
  {
    accessorKey: "place",
    header: "Trip Place",
  },
  {
    accessorKey: "numberOfDays",
    header: "Number Of days",
  },
  {
    accessorKey: "timeLeft",
    header: "Duraition Left",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const colorClass = status === "ACTIVE" ? "bg-green-500" : "bg-red-500";
      return (
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${colorClass}`} />
          <span>{status}</span>
        </div>
      );
    },
  },
];
