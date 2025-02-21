import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import PayrollChangeForm from "./PayrollChangeForm";
import MarkAsCompletedButton from "@/components/MarkAsCompletedButton";

import { PayrollEmployee } from "@/types/payroll";
import { useState } from "react";
import { viewSalaryHistoryQueryOptions } from "@/queryOptions/payrollQueryOptions";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import PayrollHistoryItem from "./PayrollHistoryItem";
import { DataTable } from "@/components/DataTable";
import { payrollHistoryColumns } from "./payrollHistoryColumns";

export default function PayrollTableActions({
  employee,
}: {
  employee: PayrollEmployee;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data, isPending, error } = useQuery({
    ...viewSalaryHistoryQueryOptions(employee?.salary?.id),
    enabled: isViewDialogOpen,
  });

  if (!isPending && error)
    return toast.error("Something went wrong, try to refresh the page");
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit Payroll
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <MarkAsCompletedButton
            salaryId={employee?.salary?.id}
            status={employee?.salary?.status}
          />
          <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
            View payroll history
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className=" max-sm:max-w-[90dvw] rounded-md">
          <DialogHeader>
            <DialogTitle>{`Edit ${employee.firstName}'s payroll`}</DialogTitle>
            <DialogDescription>
              Make changes to employee's payroll. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <PayrollChangeForm
            employee={employee}
            salaryId={employee?.salary?.id}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-sm:max-w-[90dvw] rounded-md md:min-w-[640px]">
          <DialogHeader className="relative">
            <DialogTitle>{`${employee.firstName} ${employee.lastName}'s Payroll History`}</DialogTitle>
            <DialogDescription>
              {isPending ? "Fetching history..." : "History details:"}
            </DialogDescription>
          </DialogHeader>
          {isPending ? (
            <Spinner />
          ) : (
            <div className="w-full flex flex-col gap-2 overflow-auto ">
              <DataTable columns={payrollHistoryColumns} data={data.salaries} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
