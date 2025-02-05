import StatsPanel from "./StatsPanel";
import DashboardEmployeesPanel from "./DashboardEmployeesPanel";

export default function DashboardPanel() {
  return (
    <section className="h-full flex flex-col flex-1 max-sm:mt-4">
      <StatsPanel />
      <DashboardEmployeesPanel />
    </section>
  );
}
