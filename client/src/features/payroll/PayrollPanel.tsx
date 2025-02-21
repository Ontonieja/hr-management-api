import SectionWrapper from "@/components/SectionWrappers";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Bell } from "lucide-react";
import MonthPickerPopover from "@/components/MonthPickerPopover";
import { usePayrollQueryOptions } from "@/queryOptions/payrollQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PayrollTable from "./PayrollTable";
import Spinner from "@/components/Spinner";

export default function PayrollPanel() {
  const [date, setDate] = useState<Date>(new Date());
  date.setDate(2);

  const monthString = date.toISOString().slice(0, 7);

  const { data, isPending, error } = useQuery(
    usePayrollQueryOptions(monthString)
  );

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong, try to refresh the page");
    }
  }, [error]);

  if (isPending) return <Spinner />;

  return (
    <SectionWrapper>
      <div className="flex justify-between items-center ">
        <SectionHeading title="Payroll" />
        <MonthPickerPopover setDate={setDate} date={date} />
      </div>
      <div className="mt-4 w-full bg-slate-100 px-3 py-2 md:px-4 md:py-3 flex items-center rounded-md gap-2 ">
        <Bell className="size-5 text-primary_purple" />
        <p className="text-xs md:text-sm font-semibold">
          Review your payroll data carefully before closing it.
        </p>
      </div>
      {data && <PayrollTable data={data} isPending={isPending} />}
    </SectionWrapper>
  );
}
