import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";

import { PayrollEmployee } from "@/types/payroll";

import { ColumnDef } from "@tanstack/react-table";

import PayrollTableActions from "./PayrollTableActions";
import { format } from "date-fns";
import { SalaryProps } from "@/types/salary";

const STATS_LABELS = {
  NEEDSETUP: "Need Setup",
  COMPLETED: "Completed",
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const payrollHistoryColumns: ColumnDef<SalaryProps>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const salary = row.original;
      console.log(salary);
      return <span>{format(salary.date, "PPpp")}</span>;
    },
  },
  {
    accessorKey: "totalPaid",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Comp."
        className="max-sm:max-w-17"
      />
    ),
    cell: ({ row }) => {
      const salary = row.original;

      const payroll = salary.amount || 0;
      const deductions = salary.deductions || 0;
      const bonuses = salary?.bonuses || 0;

      if (!deductions && !bonuses) return formatCurrency(payroll);
      const total = payroll - deductions + bonuses || salary.amount;

      return formatCurrency(total);
    },
  },
  {
    accessorKey: "payroll",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    cell: ({ row }) => {
      const salary = row.original;
      return formatCurrency(salary.amount);
    },
  },
  {
    id: "bonuses",
    accessorFn: (row) => row?.bonuses,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bonuses" />
    ),
    cell: ({ row }) => {
      const salary = row.original;
      return formatCurrency(salary?.bonuses || 0);
    },
  },
  {
    id: "deductions",
    accessorFn: (row) => row?.deductions,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deductions" />
    ),

    cell: ({ row }) => {
      const salary = row.original;
      return formatCurrency(salary?.deductions || 0);
    },
  },
  {
    accessorFn: (row) => row.status,
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const salary = row.original;

      const status = STATS_LABELS[salary?.status];

      if (!status) {
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
            Not created yet
          </span>
        );
      }

      const formattedEmployeeStatus = status[0] + status.slice(1).toLowerCase();
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
            status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {formattedEmployeeStatus}
        </span>
      );
    },
  },
];
