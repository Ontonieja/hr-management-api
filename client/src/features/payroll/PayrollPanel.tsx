import SectionWrapper from "@/components/SectionWrappers";
import PayrollTable from "./PayrollTable";
import PayrollHeading from "./PayrollHeading";

export default function PayrollPanel() {
  return (
    <SectionWrapper>
      <PayrollHeading />
      <PayrollTable />
    </SectionWrapper>
  );
}
