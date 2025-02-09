import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashboardContext } from "@/hooks/useDashboardContext";

const chartConfig = {
  0: {
    color: "#FFC107",
  },
  1: {
    color: "#01AE70",
  },
  2: {
    color: "#7254F2",
  },
  3: {
    color: "#FF5733",
  },
  4: {
    color: "#FF9800",
  },
  5: {
    color: "#03A9F4",
  },
  6: {
    color: "#8BC34A",
  },
  7: {
    color: "#9C27B0",
  },
} satisfies Omit<ChartConfig, "visitors">;

export function DashboardPieChart() {
  const { data } = useDashboardContext();

  if (!data) return null;

  const { pieChartDepartmentData } = data;

  const pieChartDataWithColors = pieChartDepartmentData.map((dept, index) => {
    const color = chartConfig[index as keyof typeof chartConfig].color;
    return {
      ...dept,
      fill: color,
      configKey: dept.name,
    };
  });

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartDataWithColors}
              dataKey="employees"
              nameKey="name"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex gap-4 lg:gap-2 xl:gap-4 justify-center text-sm">
        {pieChartDataWithColors.map((entry) => {
          return (
            <div
              key={entry.name}
              className="flex items-center gap-2 lg:text-xs xl:text-sm font-semibold"
            >
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: entry.fill }}
              ></span>
              <span>{entry.name}</span>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
}
