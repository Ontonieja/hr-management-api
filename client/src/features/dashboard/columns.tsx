import { EmployeesDataProps } from "@/constants/employeesData";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EmployeesDataProps>[] = [
  {
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center space-x-3">
          <img
            src={employee.avatar}
            alt="avatar"
            className="size-7 rounded-full"
          />
          <span>{employee.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Job Title",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            employee.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {employee.status}
        </span>
      );
    },
  },
];
