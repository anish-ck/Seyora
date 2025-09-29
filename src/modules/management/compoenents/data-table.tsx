"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void; // New prop for row click handler
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick, // Destructure new prop
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
  });
  const now = Date.now(); // current time in ms

  const options = [
    { label: "All", value: "all" },
    { label: "1 Week", value: "7 days" },
    { label: "15 Days", value: "12 days" },
    { label: "1 Month", value: "30 days" },
    { label: "2 Months", value: "8 days" },
  ];
  const filtervalue =
    (table.getColumn("numberOfDays")?.getFilterValue() as string) ?? "all";

  return (
    <div className="p-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between py-4 mb-4">
        <Input
          placeholder="Filter by email..."
          value={
            (table.getColumn("useremail")?.getFilterValue() as string) ?? ""
          }
          className="max-w-sm bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-neutral-500"
          onChange={(event) =>
            table.getColumn("useremail")?.setFilterValue(event.target.value)
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700 hover:text-neutral-100"
            >
              {options.find((o) => o.value === filtervalue)?.label ??
                "Filter by time"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
            {options.map((optionItem) => (
              <DropdownMenuItem
                key={optionItem.value}
                className="text-neutral-200 p-2 bg-neutral-700 hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer"
                onClick={() =>
                  table
                    .getColumn("numberOfDays")
                    ?.setFilterValue(optionItem.value)
                }
              >
                {optionItem.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table container */}
      <div className="overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b hover:sca1e-102 border-neutral-700 p-2 bg-neutral-700 hover:bg-neutral-750"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-neutral-200 font-semibold bg-neutral-800/80 py-4 px-6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)} // Add onClick handler
                  className={`
                  border-b border-neutral-700 
                  transition-colors duration-200
                  hover:bg-neutral-750
                  ${index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-825"}
                  ${
                    row.getIsSelected()
                      ? "bg-neutral-600 hover:bg-neutral-600"
                      : ""
                  }
                  ${
                    onRowClick ? "cursor-pointer" : ""
                  } // Add cursor-pointer class conditionally
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-neutral-200 py-4 px-6 border-b-2 border-neutral-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-neutral-400 py-8"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-lg">No results found</div>
                    <div className="text-sm text-neutral-500">
                      Try adjusting your filters
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
