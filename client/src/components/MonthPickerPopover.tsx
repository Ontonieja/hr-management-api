import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MonthPicker } from "./ui/monthpicker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MonthPickerPopoverProps {
  date: Date;
  setDate: (date: Date) => void;
}
export default function MonthPickerPopover({
  date,
  setDate,
}: MonthPickerPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "md:min-w-[180px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMM yyyy") : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker onMonthSelect={setDate} selectedMonth={date} />
      </PopoverContent>
    </Popover>
  );
}
