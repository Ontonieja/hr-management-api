import StatsPanel from "./StatsPanel";
import DashboardEmployeesPanel from "./DashboardEmployeesPanel";
import SectionWrapper from "@/components/SectionWrappers";

export default function DashboardPanel() {
  return (
    <SectionWrapper>
      <StatsPanel />
      <DashboardEmployeesPanel />
    </SectionWrapper>
  );
}
