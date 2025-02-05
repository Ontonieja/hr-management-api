import { DashboardBarChart } from "@/features/dashboard/DashboardBarChart";
import StatTile from "@/components/StatTile";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

export default function StatsPanel() {
  return (
    <>
      <div className="flex justify-between items-center  ">
        <h2 className="text-xl lg:text-2xl font-extrabold">Job Statistics </h2>
        <DatePickerWithRange />
      </div>
      <div className="border border-slate-200 mt-4  rounded-xl ">
        <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-5 gap-4">
          <div className="grid grid-cols-2 md:col-span-3 xl:col-span-2 ">
            <StatTile
              title="Total Employees"
              value={300}
              category="Employee"
              isFirstRow={true}
              percentage={25}
            />
            <StatTile
              title="Resigned Employees"
              value={24}
              category="Employee"
              isFirstRow={true}
              percentage={-25}
            />
            <StatTile
              title="Total Payroll"
              value={"64,520.83"}
              category="Employee"
              percentage={14}
              cost={true}
            />
            <StatTile
              title="Total Employees"
              value={300}
              category="Employee"
              percentage={-12}
            />
          </div>
          <div className="md:col-span-3 xl:col-span-3 max-h-[300px]">
            <DashboardBarChart />
          </div>
        </div>
      </div>
    </>
  );
}
