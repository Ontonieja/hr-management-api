import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { PayrollEmployee } from "@/types/payroll";
import { Button } from "@/components/ui/button";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { usePayrollEdit } from "@/services/payrollService";
import { DialogTrigger } from "@radix-ui/react-dialog";

const formSchema = z.object({
  salary: z.coerce
    .number()
    .min(0, { message: "Salary must be greater than 0" }),
  bonuses: z.coerce
    .number()
    .min(0, { message: "Bonus must be greater than 0" }),
  deductions: z.coerce
    .number()
    .min(0, { message: "Deduction must be greater than 0" }),
});

interface PayrollChangeFormProps {
  employee: PayrollEmployee;
  salaryId: number;
}
export default function PayrollChangeForm({
  employee,
  salaryId,
}: PayrollChangeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: employee.payroll,
      bonuses: employee.salary.bonuses,
      deductions: employee.salary.deductions,
    },
  });

  const { mutate, isPending } = usePayrollEdit();

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = { id: employee.id, salaryId, ...values };
    mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="grid gap-4 py-4">
          <div className=" md:grid-cols-6 items-center gap-4">
            <FormFieldWrapper
              name="salary"
              control={form.control}
              label="Salary"
              placeholder="Enter salary..."
              type="number"
              disabled={isPending}
            />
          </div>
          <div className=" md:grid-cols-6 items-center gap-4">
            <FormFieldWrapper
              name="bonuses"
              control={form.control}
              label="Bonus"
              placeholder="Enter bonus..."
              type="number"
              disabled={isPending}
            />
          </div>
          <div className=" md:grid-cols-6 items-center gap-4">
            <FormFieldWrapper
              name="deductions"
              control={form.control}
              label="Deductions"
              placeholder="Enter deductions..."
              type="number"
              disabled={isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" disabled={isPending}>{`${
              isPending ? "Saving..." : "Save"
            }`}</Button>
          </DialogTrigger>
        </DialogFooter>
      </form>
    </Form>
  );
}
