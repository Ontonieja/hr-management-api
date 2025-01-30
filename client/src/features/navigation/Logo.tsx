import { selectIsCollapsed, toggleSidebar } from "@/store/uiSlice";
import classNames from "classnames";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import logoImg from "@/assets/logo.png";

export default function Logo() {
  const isCollapsed = useSelector(selectIsCollapsed);

  const dispatch = useDispatch();
  return (
    <div
      className={classNames(
        "inline-flex justify-between items-center sm:border-r border-slate-200",
        {
          "min-w-16 pr-2": isCollapsed,
          "lg:w-[15%] w-1/5 pr-4": !isCollapsed,
        }
      )}
    >
      <a href="/dashboard" className="inline-flex items-center gap-2">
        <img src={logoImg} alt="logo" className="w-6 h-6" />
        {!isCollapsed && <h1 className="text-xl font-extrabold">staffio</h1>}
      </a>
      {isCollapsed ? (
        <ArrowRightToLine
          className="w-5 h-5 max-md:hidden bg-slate-100 hover:text-primary_purple cursor-pointer transition duration-200 ease-in-out"
          onClick={() => dispatch(toggleSidebar())}
        />
      ) : (
        <ArrowLeftToLine
          className="w-5 h-5 max-md:hidden bg-slate-100 hover:text-primary_purple cursor-pointer transition duration-200 ease-in-out"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
    </div>
  );
}
