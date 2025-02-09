import DashboardLayout from "@/components/DashboardLayout";
import { DashboardProvider } from "@/features/dashboard/DashboardContext";
import DashboardPanel from "@/features/dashboard/DashboardPanel";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardProvider>
        <DashboardPanel />
      </DashboardProvider>
    </DashboardLayout>
  );
}
