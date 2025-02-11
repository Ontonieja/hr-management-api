import DashboardLayout from "@/components/DashboardLayout";
import PayrollPanel from "@/features/payroll/PayrollPanel";

export default function Payroll() {
  return (
    <DashboardLayout>
      <PayrollPanel />
    </DashboardLayout>
  );
}
