import { Home, FileText, Users } from "lucide-react";

interface NavItemsProps {
  title: string;
  url: string;
  icon: React.ComponentType;
}

const navItems: NavItemsProps[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Payroll",
    url: "#",
    icon: FileText,
  },
  {
    title: "Employee",
    url: "#",
    icon: Users,
  },
];

export default navItems;
