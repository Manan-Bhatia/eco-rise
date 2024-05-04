"use client";

import { useState, useEffect, useMemo } from "react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    Column,
    RowData,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArrowDownZA,
    ArrowUpDown,
    ArrowUpZA,
    CalendarIcon,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}
declare module "@tanstack/react-table" {
    //allows us to define custom properties for our columns
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "time" | "select" | "date";
    }
}
export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onColumnVisibilityChange: setColumnVisibility,
        filterFns: {
            customDateFilter: (row, columnId, filterValue) => {
                console.log(row, columnId, filterValue);
                return true;
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });
    const [columnNames, setColumnNames] = useState<string[]>([]);
    useEffect(() => {
        const columnNames: string[] = [];
        table
            .getAllColumns()
            .filter((column) => column.getCanFilter())
            .forEach((column) => {
                columnNames.push(column.id);
            });
        setColumnNames(columnNames);
    }, [table]);
    const [filterSelected, setFilterSelected] = useState<string>("");
    useEffect(() => {
        if (columnNames.length == 0) return;
        setFilterSelected(columnNames[0] || "");
    }, [columnNames]);
    const handleFilterChange = (value: string) => {
        setFilterSelected(value);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-0 items-center pb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="hidden sm:flex">
                        <Button variant="outline" className="ml-auto">
                            Visible Columns{" "}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="p-3"
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        {...{
                                                            className:
                                                                header.column.getCanSort()
                                                                    ? "cursor-pointer select-none flex items-center gap-2 w-full"
                                                                    : "",
                                                            onClick:
                                                                header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}

                                                        <ArrowUpDown
                                                            className={`ml-2 h-4 w-4 ${
                                                                header.column.getIsSorted() ===
                                                                    "asc" ||
                                                                header.column.getIsSorted() ===
                                                                    "desc"
                                                                    ? "hidden"
                                                                    : ""
                                                            }`}
                                                        />
                                                        {{
                                                            asc: <ArrowUpZA />,
                                                            desc: (
                                                                <ArrowDownZA />
                                                            ),
                                                        }[
                                                            header.column.getIsSorted() as string
                                                        ] ?? null}
                                                    </Button>
                                                    {header.column.getCanFilter() ? (
                                                        <Filter
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                    ) : null}
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <span className="px-4 py-2">
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                    </span>
                                                    {header.column.getCanFilter() ? (
                                                        <Filter
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                    ) : null}
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
function Filter({ column }: { column: Column<any, unknown> }) {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta ?? {};
    const sortedUniqueValues = useMemo(
        () =>
            Array.from(column.getFacetedUniqueValues().keys())
                .sort()
                .slice(0, 5000),
        [column.getFacetedUniqueValues(), filterVariant]
    );
    let dateString: string = "";
    if (typeof columnFilterValue === "string") {
        dateString = new Date(columnFilterValue).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    return filterVariant === "date" ? (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {columnFilterValue && dateString ? (
                            format(dateString, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <Calendar
                        mode="single"
                        selected={new Date(dateString || "")}
                        onSelect={(value) => {
                            column.setFilterValue(
                                value?.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                            );
                        }}
                        initialFocus
                    />
                    <Button
                        variant="secondary"
                        onClick={() => column.setFilterValue("")}
                    >
                        Clear
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    ) : filterVariant === "time" ? (
        <div></div>
    ) : filterVariant === "select" ? (
        <Select
            onValueChange={(e) => {
                if (e === " ") {
                    column.setFilterValue("");
                } else column.setFilterValue(e);
            }}
            value={columnFilterValue ? columnFilterValue.toString() : " "}
            defaultValue=" "
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select .." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value=" ">All</SelectItem>
                {sortedUniqueValues.map((value) => (
                    <SelectItem value={value} key={value}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ) : (
        <>
            <DebouncedInput
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search...`}
                type="text"
                value={(columnFilterValue ?? "") as string}
            />
        </>
    );
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <Input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
