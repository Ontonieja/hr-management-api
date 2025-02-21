import { useMarkAsCompleted } from "@/services/payrollService";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function MarkAsCompletedButton({
  salaryId,
  status,
}: {
  salaryId: number;
  status: string;
}) {
  const { mutate } = useMarkAsCompleted();

  const handleMarkAsCompleted = async () => {
    mutate(salaryId);
  };
  return (
    <DropdownMenuItem onClick={() => handleMarkAsCompleted()}>
      {status === "COMPLETED" ? "Mark as Uncompleted" : "Mark as Completed"}
    </DropdownMenuItem>
  );
}
