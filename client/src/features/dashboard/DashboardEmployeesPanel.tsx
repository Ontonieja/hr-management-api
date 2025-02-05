import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { employeesData } from "@/constants/employeesData";
import { DashboardPieChart } from "./DashboardPieChart";

export default function EmployeesTable() {
  return (
    <div className="flex flex-col lg:flex-row w-full mt-6 gap-6 2xl:gap-8 lg:mt-6 2xl:mt-8">
      <div className="flex flex-col flex-1 h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl lg:text-2xl font-extrabold">
            Employee Status
          </h2>
        </div>
        <DataTable columns={columns} data={employeesData} />
      </div>

      <div className="lg:w-1/3 h-full flex">
        <div className="flex flex-col w-full h-full">
          <h2 className="text-xl lg:text-2xl font-extrabold mb-4">
            Department Split
          </h2>
          <DashboardPieChart />
        </div>
      </div>
    </div>
  );
}
