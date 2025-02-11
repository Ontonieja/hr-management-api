import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { DashboardPieChart } from "./DashboardPieChart";
import { useDashboardContext } from "@/hooks/useDashboardContext";
import SectionHeading from "@/components/ui/SectionHeading";

export default function EmployeesTable() {
  const { data } = useDashboardContext();

  if (!data) return null;

  const { employees } = data;
  return (
    <div className="flex flex-col lg:flex-row w-full mt-6 gap-6 2xl:gap-8 lg:mt-6 2xl:mt-8">
      <div className="flex flex-col flex-1 h-full">
        <div className="flex justify-between items-center mb-4">
          <SectionHeading title="Employee Status" />
        </div>
        <DataTable columns={columns} data={employees} />
      </div>

      <div className="lg:w-1/3 h-full flex">
        <div className="flex flex-col w-full h-full">
          <SectionHeading title="Department Split" />

          <DashboardPieChart />
        </div>
      </div>
    </div>
  );
}
