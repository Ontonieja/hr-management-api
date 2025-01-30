import { selectIsCollapsed } from "@/store/uiSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

interface NavItemsProps {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function SidebarItem({ title, url, icon: Icon }: NavItemsProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = useSelector(selectIsCollapsed);

  const activeBackground = "bg-[#f7f4ff] text-primary_purple";
  return (
    <a
      href={url}
      className={`flex items-center text-dark_gray rounded-xl transition ease-in-out duration-200 hover:text-primary_purple font-bold  ${
        currentPath === url && !isCollapsed ? activeBackground : ""
      }`}
    >
      <Icon
        className={`${
          currentPath === url && isCollapsed ? activeBackground : ""
        } size-5 flex-shrink-0 box-content p-2 rounded-xl hover:bg-[#f7f4ff] `}
      />
      {!isCollapsed && <span className="ml-2">{title}</span>}
    </a>
  );
}
