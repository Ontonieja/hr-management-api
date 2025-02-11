import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/ui/SectionHeading";
import { payrollColumns } from "./columns";
import useDashboardQueryOptions from "@/queryOptions/dashboardQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/DataTable";
import { useState } from "react";

export default function PayrollTable() {
  const { data } = useQuery(useDashboardQueryOptions());
  const [filter, setFilter] = useState("");

  if (!data) return null;

  const { employees } = data;

  const filteredData = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );
  return (
    <>
      <div className="flex justify-between items-center text-white/ mt-6 xl:mt-8">
        <SectionHeading title="Employees Payroll" />
        <Input
          className="max-w-[150px] md:max-w-[240px]"
          placeholder="Search employees..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="mt-4 w-full  max-w-full overflow-hidden h-full">
        <DataTable columns={payrollColumns} data={filteredData} pageSize={10} />
      </div>
    </>
  );
}
