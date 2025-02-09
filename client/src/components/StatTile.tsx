import classNames from "classnames";
import StatsPercentage from "./StatsPercentage";

interface StatTileProps {
  title: string;
  value: number | string;
  category: string;
  isFirstRow?: boolean;
  percentage: number;
  cost?: boolean;
  displayPercentage?: boolean;
}

export default function StatTile({
  title,
  value,
  category,
  isFirstRow,
  percentage,
  cost,
  displayPercentage = false,
}: StatTileProps) {
  return (
    <div
      className={classNames(
        "flex flex-col border-r border-slate-200 p-3 2xl:p-6",
        {
          "": isFirstRow,
          "border-t max-md:border-b": !isFirstRow,
        }
      )}
    >
      <h3 className="font-semibold text-sm 2xl:text-lg">{title}</h3>
      <div className="flex items-center gap-2">
        <p className="font-extrabold text-lg  2xl:text-3xl mt-2">
          {`${cost ? "$" : ""}${value}${displayPercentage ? "%" : ""}`}
        </p>
        <StatsPercentage percentage={percentage} />
      </div>
      <p className="text-light_gray max-sm:text-sm">{category}</p>
    </div>
  );
}
