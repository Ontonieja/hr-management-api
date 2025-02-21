import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";

import { PayrollEmployee } from "@/types/payroll";

import { ColumnDef } from "@tanstack/react-table";

import PayrollTableActions from "./PayrollTableActions";

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

export const payrollColumns: ColumnDef<PayrollEmployee>[] = [
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
          <span className="whitespace-nowrap min-w-[100px]">{`${employee.firstName} ${employee.lastName}`}</span>
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
        className="max-sm:max-w-17"
      />
    ),
    cell: ({ row }) => {
      const employee = row.original;
      const payroll = employee?.payroll || 0;
      const deductions = employee.salary?.deductions || 0;
      const bonuses = employee.salary?.bonuses || 0;

      if (!deductions && !bonuses) return formatCurrency(payroll);
      const total = payroll - deductions + bonuses || employee.payroll;

      return formatCurrency(total);
    },
  },
  {
    accessorKey: "payroll",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    cell: ({ row }) => {
      const employee = row.original;
      return formatCurrency(employee.payroll);
    },
  },
  {
    id: "bonuses",
    accessorFn: (row) => row?.salary?.bonuses,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bonuses" />
    ),
    cell: ({ row }) => {
      const employee = row.original;
      return formatCurrency(employee?.salary?.bonuses || 0);
    },
  },
  {
    id: "deductions",
    accessorFn: (row) => row?.salary?.deductions,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deductions" />
    ),
    cell: ({ row }) => {
      const employee = row.original;
      return formatCurrency(employee?.salary?.deductions || 0);
    },
  },
  {
    accessorFn: (row) => row.salary.status,
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const employee = row.original;

      const status = STATS_LABELS[employee?.salary?.status];

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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original;

      return <PayrollTableActions employee={employee} />;
    },
  },
];
