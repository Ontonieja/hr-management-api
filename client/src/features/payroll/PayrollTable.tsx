import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/ui/SectionHeading";
import { payrollColumns } from "./payrollColumns";

import { DataTable } from "@/components/DataTable";
import { useState } from "react";
import { PayrollResponse } from "@/types/payroll";
import Spinner from "@/components/Spinner";

export default function PayrollTable({
  data,
  isPending,
}: {
  data: PayrollResponse;
  isPending: boolean;
}) {
  const [filter, setFilter] = useState("");
  // console.log(isPending);

  if (isPending) return <Spinner />;

  const { employees } = data as PayrollResponse;

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
      <div className="mt-4 w-full  max-w-full overflow-y-auto h-full">
        <DataTable columns={payrollColumns} data={filteredData} pageSize={10} />
      </div>
    </>
  );
}
