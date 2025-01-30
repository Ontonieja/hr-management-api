import navItems from "@/constants/navItems";
import SidebarItem from "./SidebarItem";

export default function NavItems() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {navItems.map((item) => (
        <SidebarItem key={item.title} {...item} />
      ))}
    </div>
  );
}
