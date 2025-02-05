import classNames from "classnames";
import { TrendingUp } from "lucide-react";

export default function StatsPercentage({
  percentage,
}: {
  percentage: number;
}) {
  const isPercentagePositive = percentage > 0;
  return (
    <div
      className={classNames("flex items-center px-1 text-sm rounded-sm", {
        "bg-background_green text-primary_green": isPercentagePositive,
        "bg-background_red text-primary_red": !isPercentagePositive,
      })}
    >
      <TrendingUp className="size-4 mr-1" />
      <span className="font-extrabold">{percentage}%</span>
    </div>
  );
}
