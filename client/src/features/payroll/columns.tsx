import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmployeesProps } from "@/types/employees";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const payrollColumns: ColumnDef<EmployeesProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <div className="flex items-center space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="avatar"
            className="size-7 rounded-full"
          />
          <span className="whitespace-nowrap">{`${employee.firstName} ${employee.lastName}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Comp."
        className="max-sm:max-w-12"
      />
    ),
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-sm:hidden"
        column={column}
        title="Salary"
      />
    ),
  },
  {
    accessorKey: "bonuses",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-sm:hidden"
        column={column}
        title="Bonuses"
      />
    ),
  },
  {
    accessorKey: "deductions",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-sm:hidden"
        column={column}
        title="Deductions"
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const employee = row.original;
      const formattedEmployeeStatus =
        employee.status[0] + employee.status.slice(1).toLowerCase();
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            employee.status === "ACTIVE"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {formattedEmployeeStatus}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(employee.firstName)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
