import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import SectionHeading from "@/components/ui/SectionHeading";
import { Bell } from "lucide-react";

export default function PayrollHeading() {
  return (
    <>
      {" "}
      <div className=" flex justify-between items-center ">
        <SectionHeading title="Payroll" />
        <DatePickerWithRange />
      </div>
      <div className="mt-4 w-full bg-slate-100 px-3 py-2 md:px-4 md:py-3 flex items-center rounded-md gap-2">
        <Bell className="size-5 text-primary_purple" />
        <p className="text-xs md:text-sm font-semibold">
          Review your payroll data carefully before closing it.
        </p>
      </div>
    </>
  );
}
