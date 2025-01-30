import { useSelector } from "react-redux";
import NavItems from "@/components/NavItems";
import { selectIsCollapsed } from "@/store/uiSlice";

export default function LeftSidebar() {
  const isCollapsed = useSelector(selectIsCollapsed);
  return (
    <section
      className={` ${
        isCollapsed ? "min-w-16" : "lg:w-[15%] w-1/5 pr-4 "
      } max-md:hidden  h-full border-r text-sm border-slate-200`}
    >
      <h2
        className={`text-light_gray font-semibold ml-2 ${
          isCollapsed ? "invisible" : ""
        }`}
      >
        General
      </h2>
      <NavItems />
    </section>
  );
}
