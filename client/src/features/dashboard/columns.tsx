import { EmployeesProps } from "@/types/employees";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EmployeesProps>[] = [
  {
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <div className="flex items-center space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="avatar"
            className="size-7 rounded-full"
          />
          <span>{`${employee.firstName} ${employee.lastName}`}</span>
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
    cell: ({ row }) => {
      const employee = row.original;

      return <span>{employee.department.name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
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
];
